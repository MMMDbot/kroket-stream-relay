import fetch from 'node-fetch'

const demoObject = [
    {
        id: 1,
        name: 'Playlist 1',
        url: 'https://cph-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
        source: 'hls',
        user_id: 1,
        created_at: '123456789',
    },
    {
        id: 2,
        name: 'Playlist 2',
        url: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8',
        source: 'hls',
        user_id: 1,
        created_at: '123456789',
    },
    {
        id: 3,
        name: 'Playlist 3',
        url: 'https://multiplatform-f.akamaihd.net/i/multi/april11/hdworld/hdworld_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8',
        source: 'hls',
        user_id: 1,
        created_at: '123456789',
    },
    {
        id: 4,
        name: 'Playlist 4',
        url: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/masterr.m3u8',
        source: 'hls',
        user_id: 1,
        created_at: '123456789',
    },
]

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
