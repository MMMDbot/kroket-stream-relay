import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { io } from 'socket.io-client'
import Button from 'react-bootstrap/Button'
import StatusBadge from './StatusBadge'

export default function StreamPlayer(props) {
    // Test Stream
    // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    // Real Stream
    // `http://localhost:3001/streams/${props.streamId}/stream.m3u8`
    const [streamStatus, setStreamStatus] = useState('...')
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const socket = io('http://localhost:8080')
    socket.on(props.streamId, (status) => {
        setStreamStatus(status)
    })

    const stopStream = () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(
            `http://localhost:3001/api/stop/${props.streamId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                setButtonDisabled(true)
                console.log(data)
            })
    }

    return (
        <div>
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
            The stream id is {props.streamId} | Stream is currently{' '}
            {props.status} <StatusBadge active={props.active} />
            <Button
                variant="danger"
                disabled={buttonDisabled}
                onClick={stopStream}
            >
                Stop Stream
            </Button>
        </div>
    )
}
