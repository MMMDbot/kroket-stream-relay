const db = require('../data/users')
const genThumbnail = require('simple-thumbnail')
const YTDlpWrap = require('yt-dlp-wrap').default
const ytDlpWrap = new YTDlpWrap()

console.log('hola')

async function doSomethingAsync() {
    const { rows } = await db.getAllActiveIngests()
    return rows
}

;(async function () {
    const response = await doSomethingAsync()
    //console.log(response)
    for (element of response) {
        if (element.origin.includes('m3u8')) {
            console.log(element)
            //Try to generate thumbnail
            // Store thumbnail in corresponding folder

            // If the stream is not directly HLS
        } else {
            // Convert the video URL into an HLS url
            const HLSUrl = await getHLSUrl(element.origin)
            // Generate the thumbnail
            console.log(HLSUrl)
            // Store thumbnail in corresponding folder
        }
    }
    /*     genThumbnail(
        'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
        './img/hola.png',
        '630x354'
    )
        .then(() => console.log('done!'))
        .catch((err) => console.error(err)) */
})()

async function getHLSUrl(stream) {
    let metadata = await ytDlpWrap.getVideoInfo(stream)
    return metadata.url
}
