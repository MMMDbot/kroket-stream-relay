import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Target from './Target'
import { io } from 'socket.io-client'
import Loading from './Loading'

export default function Targets() {
    const [isOnline, setOnline] = useState('offline')
    const [isLoading, setIsLoading] = useState(true)
    const [targetData, setTargetData] = useState([])

    const socket = io('http://localhost:8080')
    socket.on('receive-message', (message) => {
        setOnline(message)
    })

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch('http://localhost:3001/api/targets/org', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTargetData(data)
                setIsLoading(false)
            })
    }, [])

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
            <Row>
                <h2>Targets</h2>
            </Row>
            <Row sm={1} md={2} lg={2} xl={2} xxl={3} className="g-4">
                {isLoading ? <Loading height={'200px'} /> : targetList}
            </Row>
        </div>
    )
}
