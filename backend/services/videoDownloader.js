const { PythonShell } = require('python-shell')
const path = require('path')

/**
 * Returns the download URL of a video from social media
 * @param  {String} source    URL of the video origin
 */
async function downloadVideo(source) {
    let options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3.9',
        pythonOptions: ['-u'], // get print results in real-time
        args: ['download', source],
    }

    const scriptPath = path.join(__dirname + '/../tasks/initTask.py')

    const result = await new Promise((resolve, reject) => {
        PythonShell.run(scriptPath, options, (err, results) => {
            if (err) return reject(err)
            // results is an array consisting of messages collected during execution
            console.log('results: %j', results)
            return resolve(results)
        })
    })

    return result
}

module.exports = {
    downloadVideo,
}
