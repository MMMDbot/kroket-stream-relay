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
 */
async function ingest(description, origin, userid) {
    // Get user ID from the session
    if (userid === undefined) {
        throw new Error('Not logged in.')
    }
    try {
        // Handle origin url
        const parsedOrigin = originParser(origin)
        console.log(parsedOrigin)
    } catch (error) {
        return {
            message: 'Error parsing URL',
        }
    }
    try {
        // Create Ingest Folder, return ID of the stream
        const id = createIngestFolder()
        // Start Encode
        const encode = encodeIngest(id, parsedOrigin)
        console.log(encode)
        // Return success or fail
    } catch (error) {
        return {
            message: 'Error creating encoding folder or manifest',
        }
    }
    // Add ingest to DB if encoding has started
    try {
        const result = await db.addIngest(
            id,
            id,
            description,
            userid,
            parsedOrigin
        )
    } catch (error) {
        return {
            message: 'Database Error',
        }
    }
    // Return ID as 'streamId'
    return { streamId: id }
}

/**
 * Generates ID and creates Ingest folder in ../public/streams.
 * @return {String} The ID Generated.
 */
function createIngestFolder() {
    const id = nanoid()
    const makeDir = util.promisify(fs.mkdir)
    const copyFile = util.promisify(fs.copyFile)
    const foldername = path.join(__dirname + '/../public/streams/' + id)
    const manifestname = path.join(__dirname + '/../public/streams/stream.m3u8')
    const manifestdestination = path.join(foldername + '/stream.m3u8')

    console.log(id)

    const createDirectory = async (foldername) => {
        try {
            await makeDir(foldername)
            console.log('Directory created')
            console.log('Copying manifest...')
        } catch (error) {
            console.log('Error creating directory: ' + error)
        }
        await copyManifest(manifestname, manifestdestination)
    }

    const copyManifest = async (manifestname, manifestdestination) => {
        try {
            await copyFile(manifestname, manifestdestination)
            console.log('Placeholder manifest copied')
        } catch (error) {
            console.log('Error copying placeholder manifest')
        }
    }

    try {
        createDirectory(foldername)
    } catch (error) {
        console.log(error)
    }
    return id
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
 * @param  {String} id      Id of the folder where the HLS streaming will save the playlist and chunks.
 * @param  {String} server
 * @param  {String} streamKey
 */
function relay(id, server, streamKey) {
    const relayId = id + '-' + nanoid4()
    let options = {
        mode: 'text',
        pythonPath:
            '/home/square/.local/share/virtualenvs/backend-uA8zwRa8/bin/python3.9',
        pythonOptions: ['-u'], // get print results in real-time
        args: ['relay', id, relayId, server, streamKey],
    }

    const scriptPath = path.join(__dirname + '/../tasks/initTask.py')

    PythonShell.run(scriptPath, options, function (err, results) {
        if (err) throw err
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results)
    })
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

module.exports = { ingest, stop, relay, createIngestFolder, deleteIngestFolder }
