import React, { useState, useEffect } from 'react'
import Relay from './Relay'
import Row from 'react-bootstrap/Row'

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
                setRelays(data)
            })
    }, [props.reloader.value])

    const relaysList = relays.map((relay) => (
        <Relay key={relay.id} relay={relay} streamId={props.streamId} />
    ))
    return (
        <div>
            <h1>Relays for stream {props.streamId}</h1>
            <Row sm={1} md={2} lg={2} xl={2} xxl={3} className="g-4">
                {relaysList}
            </Row>
        </div>
    )
}
