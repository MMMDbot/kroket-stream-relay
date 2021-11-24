import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { io } from 'socket.io-client'
import StatusBadge from './StatusBadge'

export default function StreamPlayer(props) {
    // Test Stream
    // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    // Real Stream
    // `http://localhost:3001/streams/${props.streamId}/stream.m3u8`
    return (
        <div>
            <h1 style={{ display: 'inline-block' }}>{props.name}</h1>
            <h6 style={{ display: 'inline-block' }}>
                <StatusBadge active={props.active} />
            </h6>
            <ReactPlayer
                url={`http://localhost:3001/streams/${props.streamId}/stream.m3u8`}
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
