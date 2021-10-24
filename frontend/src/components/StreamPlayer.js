import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import ReactLoading from 'react-loading'

export default function StreamPlayer(props) {
    // Test Stream
    // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    // Real Stream
    // `http://localhost:3001/streams/${props.streamId}/stream.m3u8`
    const [isPlayerLoading, setPlayerLoading] = useState(true)

    useEffect(() => {
        setTimeout(function () {
            setPlayerLoading(false)
        }, 20000)
    }, [])

    if (isPlayerLoading) {
        return (
            <div>
                <ReactLoading type="spin" color="#000" />
            </div>
        )
    } else {
        return (
            <div>
                <ReactPlayer
                    url={`http://localhost:3001/streams/${props.streamId}/stream.m3u8`}
                    config={{
                        file: {
                            attributes: { controls: 1, preload: 'none' },
                            forceHLS: true,
                            hlsOptions: {
                                debug: true,
                                manifestLoadingMaxRetry: 10,
                                manifestLoadingRetryDelay: 1000,
                                manifestLoadingMaxRetryTimeout: 5000,
                            },
                        },
                    }}
                    width="100%"
                    height="100%"
                />
                The stream id is {props.streamId}
            </div>
        )
    }
}
