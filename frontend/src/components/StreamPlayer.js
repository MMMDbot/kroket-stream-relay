import React from 'react'
import ReactPlayer from 'react-player'

export default function StreamPlayer(props) {
    // Test Stream
    // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    // Real Stream
    // `http://localhost:3001/streams/${props.streamId}/stream.m3u8`
    return (
        <div>
            <ReactPlayer
                url={`https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`}
                config={{
                    file: {
                        attributes: { controls: 1 },
                    },
                }}
                width="100%"
                height="100%"
            />
            The stream id is {props.streamId}
        </div>
    )
}
