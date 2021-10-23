import React, { useState } from 'react'
import { io } from 'socket.io-client'

export default function Target() {
    const [isOnline, setOnline] = useState('offline')

    const socket = io('http://localhost:8080')
    socket.on('receive-message', (message) => {
        setOnline(message)
    })
    return (
        <div>
            <ul>
                <li>
                    <strong>Target 1</strong>
                </li>
                <li>server is {isOnline}</li>
                <li>stream key</li>
            </ul>
        </div>
    )
}
