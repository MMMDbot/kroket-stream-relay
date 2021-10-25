const { customAlphabet } = require('nanoid')
const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 9)
const nanoid4 = customAlphabet(alphabet, 4)
const fs = require('fs')
const path = require('path')
const { PythonShell } = require('python-shell')

/**
 * Generates ID and creates Ingest folder in ../public/streams.
 * @return {String} The ID Generated.
 */
function createIngestFolder() {
    const id = nanoid()
    console.log(id)
    const foldername = path.join(__dirname + '/../public/streams/' + id)

    fs.mkdir(foldername, (err) => {
        if (err) {
            return console.error(err)
        }
    })
    const manifestname = path.join(__dirname + '/../public/streams/stream.m3u8')
    const manifestdestination = path.join(foldername + '/stream.m3u8')
    fs.copyFile(manifestname, manifestdestination, (err) => {
        if (err) {
            return console.error(err)
        }
    })
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
function ingest(id, origin) {
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
