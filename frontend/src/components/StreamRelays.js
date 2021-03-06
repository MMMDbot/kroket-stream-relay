import React, { useState, useEffect } from 'react'
import Relay from './Relay'
import Row from 'react-bootstrap/Row'

export default function StreamRelays(props) {
    const [relays, setRelays] = useState([])
    const API_SERVER = process.env.REACT_APP_API_SERVER

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(
            `${API_SERVER}/api/ingestrelays/${props.streamId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                setRelays(data)
            })
    }, [props.reloader.value, props.streamId, API_SERVER])
    console.log(relays)
    const relaysList = relays.map((relay) => (
        <Relay key={relay.id} relay={relay} streamId={props.streamId} />
    ))
    return (
        <div className="pt-3">
            <h4>Active destinations for this stream ({props.streamId})</h4>
            <Row sm={1} md={2} lg={2} xl={2} xxl={3} className="g-4">
                {relaysList}
            </Row>
        </div>
    )
}
