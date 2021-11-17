import React from 'react'
import Card from 'react-bootstrap/Card'

export default function Relay(props) {
    return (
        <div>
            <Card border="primary" style={{ width: '16rem' }}>
                <Card.Header>{props.relay.platform}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.relay.job_id}</Card.Title>
                    <Card.Text>
                        <ul>
                            <li>Server: {props.relay.server}</li>
                            <li>Stream Key: {props.relay.stream_key}</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
