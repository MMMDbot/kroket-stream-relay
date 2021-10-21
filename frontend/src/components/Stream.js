import React from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'

export default function Stream() {
    const { id } = useParams()
    return (
        <div>
            <ReactPlayer
                url={`http://localhost:3001/streams/${id}/stream.m3u8`}
                config={{
                    file: {
                        attributes: { controls: 1 },
                    },
                }}
            />
            The stream id is {id}
        </div>
    )
}
