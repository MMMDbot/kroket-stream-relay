const { customAlphabet } = require('nanoid')
const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 9)
const nanoid4 = customAlphabet(alphabet, 4)
const fs = require('fs')
const util = require('util')
const path = require('path')
const { PythonShell } = require('python-shell')
const { originParser } = require('./urlParser')
const db = require('../data/users')

/**
 * Handles business logic for ingesting a stream
 * @param  {String} description Title of the broadcast
 * @param  {String} origin HLS url that will be encoded
 * @param  {Number} userid The user id from the req.session object
 * @return {JSON}   Id of the stream or error message if something fails
 */
async function ingest(description, origin, userid) {
    // Get user ID from the session
    if (userid === undefined) {
        throw new Error('Not logged in.')
    }
    // Set id here so we can reassign it inside the try block
    let id
    try {
        // Check that the origin is a valid URL and parse it
        const parsedOrigin = originParser(origin)
        console.log('Parsed origin is: ' + parsedOrigin)
        // Create Ingest Folder and get back the id
        const ingestResult = await createIngestFolder()
        if (ingestResult.message) {
            return ingestResult
        } else {
            id = ingestResult
        }
        console.log(id)
        // Start Encode
        const encode = encodeIngest(id, parsedOrigin)
        // Return success or fail
        // Add ingest to DB if encoding has started
        const result = await db.addIngest(
            id,
            id,
            description,
            userid,
            parsedOrigin
        )
    } catch (error) {
        console.log(error)
        return {
            message: error.message,
        }
    }
    // Return ID as 'streamId'
    return { streamId: id }
}

/**
 * Handles business logic for relaying a stream
 * @param  {String} ingest  Ingest that will be used as a base for relaying
 * @param  {String} targets Array of targets where the relays will encode
 * @param  {Number} userid  The user id from the req.session object
 * @return {JSON}           Id of the stream or error message if something fails
 */
async function relay(ingest, targets, userid) {
    // Get user ID from the session
    if (userid === undefined) {
        throw new Error('Not logged in.')
    }
    // Generate empty array to hold all Job Ids
    let jobIds = []
    // Get Ingest id from the job id
    const { rows } = await db.getIngestByJobId(ingest)
    const ingest_id = rows[0].id
    const description = 'test description'
    try {
        // targets is an Array, so we have to loop over it and encode each relay separately
        for (t in targets) {
            const jobId = ingest + '-' + nanoid4()
            jobIds.push(jobId)
            const target = targets[t]
            // Start Encode
            const encode = encodeRelay(
                ingest,
                jobId,
                target.server,
                target.stream_key
            )
            // Add relay to DB if encoding has started
            const result = await db.addRelay(
                ingest_id,
                target.id,
                description,
                userid,
                jobId
            )
        }
    } catch (error) {
        console.log(error)
        return {
            message: error.message,
        }
    }
    // Return IDs as 'JobIds' array
    console.log(jobIds)
    return jobIds
}

/**
 * Generates ID and creates Ingest folder in ../public/streams.
 * @return {String} The ID Generated.
 */
async function createIngestFolder() {
    const id = nanoid()
    const makeDir = util.promisify(fs.mkdir)
    const copyFile = util.promisify(fs.copyFile)
    const foldername = path.join(__dirname + '/../public/streams/' + id)
    const manifestname = path.join(__dirname + '/../public/streams/stream.m3u8')
    const manifestdestination = path.join(foldername + '/stream.m3u8')

    console.log(id)

    const createDirectory = async (foldername, id) => {
        try {
            await makeDir(foldername)
            console.log('Directory created')
            console.log('Copying manifest...')
            await copyManifest(manifestname, manifestdestination)
            return id
        } catch (error) {
            console.log('Server filesystem Error')
            return { message: 'Server filesystem error. Please try again.' }
        }
    }

    const copyManifest = async (manifestname, manifestdestination) => {
        await copyFile(manifestname, manifestdestination)
        console.log('Placeholder manifest copied')
    }
    const result = await createDirectory(foldername, id)

    return result
}

/**
 * Deletes an ingest folder in ../public/streams.
 * @param  {String} id  ID of the folder to delete.
 * @return {JSON}       Message after deletion.
 */
function deleteIngestFolder(id) {
    const foldername = path.join(__dirname + '/../public/streams/' + id)

    fs.rmdir(foldername, { recursive: true }, (err) => {
        if (err) {
            console.log('error')
            throw err
        }
    })
    return { message: `${id} directory deleted!` }
}

/**
 * Starts the execution of the Python script that encodes the video stream.
 * @param  {String} id  Id of the folder where the HLS streaming will save the playlist and chunks.
 */
function encodeIngest(id, origin) {
    let options = {
        mode: 'text',
        pythonPath:
            '/home/square/.local/share/virtualenvs/backend-uA8zwRa8/bin/python3.9',
        pythonOptions: ['-u'], // get print results in real-time
        args: ['ingest', id, origin],
    }

    const scriptPath = path.join(__dirname + '/../tasks/initTask.py')

    PythonShell.run(scriptPath, options, function (err, results) {
        if (err) throw err
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results)
        return results
    })
}

/**
 * Starts the execution of the Python script that relays the video stream WITHOUT reencoding
 * @param  {String} ingestId    Id of the folder where the HLS streaming will save the playlist and chunks.
 * @param  {String} relayId     Id of the relay
 * @param  {String} server
 * @param  {String} streamKey
 */
function encodeRelay(ingestId, relayId, server, streamKey) {
    let options = {
        mode: 'text',
        pythonPath:
            '/home/square/.local/share/virtualenvs/backend-uA8zwRa8/bin/python3.9',
        pythonOptions: ['-u'], // get print results in real-time
        args: ['relay', ingestId, relayId, server, streamKey],
    }

    const scriptPath = path.join(__dirname + '/../tasks/initTask.py')

    PythonShell.run(scriptPath, options, function (err, results) {
        if (err) throw err
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results)
    })
    return relayId
}

/**
 * Stops the worker that is currently executing a job
 * @param  {String} id      Id of the folder where the HLS streaming will save the playlist and chunks.
 * @param  {String} server
 * @param  {String} streamKey
 */
function stop(id) {
    let options = {
        mode: 'text',
        pythonPath:
            '/home/square/.local/share/virtualenvs/backend-uA8zwRa8/bin/python3.9',
        pythonOptions: ['-u'], // get print results in real-time
        args: ['stop', id],
    }

    const scriptPath = path.join(__dirname + '/../tasks/initTask.py')

    PythonShell.run(scriptPath, options, function (err, results) {
        if (err) throw err
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results)
    })
}

module.exports = {
    ingest,
    stop,
    relay,
    createIngestFolder,
    deleteIngestFolder,
}
