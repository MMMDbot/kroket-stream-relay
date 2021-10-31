import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { io } from 'socket.io-client'

export default function StreamPlayer(props) {
    // Test Stream
    // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    // Real Stream
    // `http://localhost:3001/streams/${props.streamId}/stream.m3u8`
    const [streamStatus, setStreamStatus] = useState('...')

    const socket = io('http://localhost:8080')
    socket.on(props.streamId, (status) => {
        setStreamStatus(status)
    })

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(
            `http://localhost:3001/api/ingest/${props.streamId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.active) {
                    setStreamStatus('Online')
                } else {
                    setStreamStatus('Offline')
                }
            })
    }, [props.streamId])

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
            The stream id is {props.streamId} | Stream is currently{' '}
            {streamStatus}
        </div>
    )
}
