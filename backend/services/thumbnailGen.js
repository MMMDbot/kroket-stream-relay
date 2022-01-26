const db = require('../data/users')
const genThumbnail = require('simple-thumbnail')
const YTDlpWrap = require('yt-dlp-wrap').default
const ytDlpWrap = new YTDlpWrap()

async function generateThumbnails() {
    const activeIngests = await db.getAllActiveIngests()

    for (element of activeIngests.rows) {
        if (element.origin.includes('m3u8')) {
            //Try to generate and store thumbnail
            try {
                genThumbnail(
                    element.origin,
                    `../public/streams/${element.folder}/thumbnail.jpeg`,
                    '630x354'
                )
                    .then(() => console.log('Thumbnail generated'))
                    .catch((err) => console.log('Error generating thumbnail'))
            } catch (error) {
                console.log('Error generating thumbnail')
            }
            // If the stream is not directly HLS
        } else {
            try {
                // Convert the video URL into an HLS url
                const { url } = await ytDlpWrap.getVideoInfo(element.origin)
                // Generate and store the thumbnail
                genThumbnail(
                    url,
                    `../public/streams/${element.folder}/thumbnail.jpeg`,
                    '630x354'
                )
                    .then(() => console.log('Thumbnail generated'))
                    .catch((err) => console.log('Error generating thumbnail'))
            } catch (error) {
                console.log('Error parsing the URL')
            }
        }
    }
}

setInterval(generateThumbnails, 300000)
