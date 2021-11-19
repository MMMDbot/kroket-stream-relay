import React from 'react'
import Card from 'react-bootstrap/Card'
import RelayPlatform from './RelayPlatform'
import RelayStatus from './RelayStatus'

export default function Relay(props) {
    const address = props.relay.server + props.relay.stream_key
    return (
        <div className="p-2">
            <Card
                border={props.relay.active ? 'danger' : 'secondary'}
                style={{ width: '16rem' }}
            >
                <Card.Header>
                    <RelayPlatform platform={props.relay.platform} />{' '}
                    <RelayStatus active={props.relay.active} />
                </Card.Header>
                <Card.Body>
                    <Card.Title>{props.relay.target_description}</Card.Title>
                    <Card.Text>
                        <a href={address}>{address}</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
