import React, { useState, useEffect } from 'react'
import Relay from './Relay'
import CardGroup from 'react-bootstrap/CardGroup'

export default function StreamRelays(props) {
    const [relays, setRelays] = useState([])

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(
            `http://localhost:3001/api/ingestrelays/${props.streamId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setRelays(data)
            })
    }, [])

    const relaysList = relays.map((relay) => (
        <Relay key={relay.id} relay={relay} />
    ))
    return (
        <div>
            <h1>Relays for stream {props.streamId}</h1>
            <CardGroup>{relaysList}</CardGroup>
        </div>
    )
}
