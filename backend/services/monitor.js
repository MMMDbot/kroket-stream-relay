import fetch from 'node-fetch'

async function parsePlaylist(url) {
    const response = await fetch(url)
    const body = await response.text()

    if (body.includes('#EXT-X-PLAYLIST-TYPE:VOD')) {
        return false
    } else if (body.includes('.ts')) {
        return true
    } else if (body.includes('.m3u8')) {
        return parsePlaylist(getPlaylistUrl(body, url))
    } else {
        return false
    }
}

function getPlaylistUrl(body, url) {
    if (body.includes('.m3u8')) {
        // get last subplaylist
        const lastSubplaylist = getLastSubplaylist(body)
        if (lastSubplaylist.includes('http')) {
            return lastSubplaylist
        } else {
            const subPlaylistAppend = lastSubplaylist.split('/').pop()
            // get prepend
            const prepend = getPrepend(url)
            // return prepend string + last subplaylist
            return `${prepend}/${subPlaylistAppend}`
        }
    } else {
        // If no subplaylist, return original url
        return url
    }
}

function getLastSubplaylist(body) {
    const lines = body.split(/\r\n|\r|\n/)
    let playlists = []
    for (let line in lines) {
        if (lines[line].includes('m3u8')) {
            playlists.push(lines[line])
        }
    }
    return playlists.pop()
}

function getPrepend(url) {
    return url.split('/').slice(0, -1).join('/')
}
