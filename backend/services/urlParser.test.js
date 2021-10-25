const { originParser } = require('./urlParser')

// YOUTUBE

test('Parse YouTube URL', () => {
    expect(originParser('https://www.youtube.com/watch?v=FgnxcUQ5vho')).toBe(
        'https://www.youtube.com/watch?v=FgnxcUQ5vho'
    )
})

test('Parse YouTube URL with playlist', () => {
    expect(
        originParser(
            'https://www.youtube.com/watch?v=H7SWqnOfuhg&list=RDH7SWqnOfuhg&start_radio=1'
        )
    ).toBe('https://www.youtube.com/watch?v=H7SWqnOfuhg')
})

test('Parse YouTube URL shorthand', () => {
    expect(originParser('https://youtu.be/H7SWqnOfuhg')).toBe(
        'https://www.youtube.com/watch?v=H7SWqnOfuhg'
    )
})

test('Parse YouTube URL non-valid', () => {
    expect(() => {
        originParser('https://youtube.com')
    }).toThrow('Invalid YouTube URL.')
})

// REUTERS

test('Parse Reuters URL', () => {
    expect(
        originParser(
            'https://d1qvkrpvk32u24.cloudfront.net/RL/smil:EU-3019a4ce-2b76-4b01-8b0c-701257d4bac7.smil/playlist.m3u8'
        )
    ).toBe(
        'https://d1qvkrpvk32u24.cloudfront.net/RL/smil:EU-3019a4ce-2b76-4b01-8b0c-701257d4bac7.smil/chunklist_b2048000.m3u8'
    )
})

// GENERIC

test('Parse generic HLS URL', () => {
    expect(
        originParser('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
    ).toBe('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
})

// NON-VALID

test('Parse incorrect URL', () => {
    expect(() => {
        originParser('asdfasdf')
    }).toThrow('Invalid Origin URL.')
})
