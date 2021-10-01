const { nanoid } = require('nanoid')
const fs = require('fs')
const path = require('path')
const { PythonShell } = require('python-shell')

/**
 * Generates ID and creates Ingest folder in ../public/streams.
 * @return {String} The ID Generated.
 */
function createIngestFolder() {
    const id = nanoid(9)
    console.log(id)
    const foldername = path.join(__dirname + '/../public/streams/' + id)

    fs.mkdir(foldername, (err) => {
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
function ingest(id) {
    let options = {
        mode: 'text',
        pythonPath:
            '/home/square/.local/share/virtualenvs/backend-uA8zwRa8/bin/python3.9',
        pythonOptions: ['-u'], // get print results in real-time
        args: [id],
    }

    const scriptPath = path.join(__dirname + '/../tasks/script.py')

    PythonShell.run(scriptPath, options, function (err, results) {
        if (err) throw err
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results)
    })
}

module.exports = { ingest, createIngestFolder, deleteIngestFolder }
