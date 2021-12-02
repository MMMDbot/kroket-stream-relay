import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import RelayPlatform from './RelayPlatform'
import RelayStatus from './StatusBadge'

export default function Relay(props) {
    const [status, setStatus] = useState(props.relay.active)
    const address = props.relay.server + props.relay.stream_key

    const stopRelay = (e) => {
        e.preventDefault()
        console.log(props.streamId)
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(
            `http://localhost:3001/api/stop/${props.relay.job_id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log('first fetch response:')
                console.log(data)
            })

        setStatus(false)
    }

    return (
        <div className="">
            <Card
                className="card-shadow"
                border={props.relay.active ? 'danger' : 'secondary'}
                style={{ width: '16rem' }}
            >
                <Card.Header>
                    <RelayPlatform platform={props.relay.platform} />{' '}
                    <RelayStatus active={status} />
                </Card.Header>
                <Card.Body>
                    <Card.Title>{props.relay.target_description}</Card.Title>
                    <Card.Text>
                        <a href={address}>{address}</a>
                    </Card.Text>
                    <Button
                        variant="primary"
                        disabled={!status}
                        onClick={stopRelay}
                    >
                        Stop
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}
