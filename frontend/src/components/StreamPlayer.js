import React from 'react'
import ReactPlayer from 'react-player'

export default function StreamPlayer(props) {
    // Test Stream
    // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    // Real Stream
    // `http://localhost:3001/streams/${props.streamId}/stream.m3u8`
    const API_SERVER = process.env.REACT_APP_API_SERVER

    return (
        <div>
            <ReactPlayer
                className="react-player"
                url={`${API_SERVER}/streams/${props.streamId}/stream.m3u8`}
                config={{
                    file: {
                        attributes: { controls: 1, preload: 'none' },
                        forceHLS: true,
                        hlsOptions: {
                            debug: false,
                            manifestLoadingMaxRetry: 10,
                            manifestLoadingRetryDelay: 1000,
                            manifestLoadingMaxRetryTimeout: 5000,
                        },
                    },
                }}
                width="100%"
                height="100%"
            />
        </div>
    )
}
