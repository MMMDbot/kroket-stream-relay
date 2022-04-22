import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Target from './Target'
import { io } from 'socket.io-client'
import Loading from './Loading'

export default function Targets() {
    const [isOnline, setOnline] = useState('offline')
    const [isLoading, setIsLoading] = useState(true)
    const [targetData, setTargetData] = useState([])
    const API_SERVER = process.env.REACT_APP_API_SERVER

    const socket = io('http://localhost:3001', {
        transports: ['websocket', 'polling', 'flashsocket'],
    })
    socket.on('receive-message', (message) => {
        console.log(isOnline)
        setOnline(message)
    })

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(`${API_SERVER}/api/targets/org`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTargetData(data)
                setIsLoading(false)
            })
    }, [API_SERVER])

    // Sort TargetData by platform
    targetData.sort(function (a, b) {
        var platformA = a.platform.toUpperCase()
        var platformB = b.platform.toUpperCase()
        if (platformA < platformB) {
            return 1
        }
        if (platformA > platformB) {
            return -1
        }
        return 0
    })

    // Build list of target cards
    const targetList = targetData.map((target) => (
        <Target key={target.id} target={target} />
    ))

    return (
        <div>
            <Card bsPrefix="card-shadow card-round mb-4">
                <Card.Body>
                    <Row>
                        <h2>Targets</h2>
                    </Row>
                    <Row className="g-4">
                        {isLoading ? <Loading height={'200px'} /> : targetList}
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}
