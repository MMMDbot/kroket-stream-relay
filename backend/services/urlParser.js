function originParser(origin) {
    if (origin.includes('d1qvkrpvk32u24')) {
        return reutersParser(origin)
    } else if (origin.includes('youtu')) {
        return youtubeParser(origin)
    } else if (origin.includes('.m3u8')) {
        return origin
    } else {
        throw new Error('Invalid Origin URL.')
    }
}

function reutersParser(origin) {
    // Replace 'playlist.m3u8' for 'chunklist_b2048000.m3u8' so only 1280x720 rendition is loaded
    const reuters720 = origin.replace(
        'playlist.m3u8',
        'chunklist_b2048000.m3u8'
    )
    return reuters720
}

function youtubeParser(origin) {
    const urlBase = 'https://www.youtube.com/watch?v='

    // Case https://www.youtube.com/watch?v=H7SWqnOfuhg
    // Case https://www.youtube.com/watch?v=H7SWqnOfuhg&list=RDH7SWqnOfuhg&start_radio=1
    if (origin.includes('?v=')) {
        let subStr = origin.split('?v=')[1]
        let videoId = subStr.slice(0, 11)
        return urlBase + videoId
    } else if (origin.includes('youtu.be')) {
        // Case https://youtu.be/H7SWqnOfuhg
        let videoId = origin.split('/').slice(-1)[0]
        return urlBase + videoId
    } else {
        throw new Error('Invalid YouTube URL.')
    }
}

module.exports = { originParser }
