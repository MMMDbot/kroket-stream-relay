import React from 'react'
import Card from 'react-bootstrap/Card'
import RelayPlatform from './RelayPlatform'

export default function Target(props) {
    console.log(props.target)
    const address = props.target.server + props.target.stream_key
    return (
        <div>
            <Card
                className="card-shadow"
                border="secondary"
                style={{ width: '18rem', height: '10rem' }}
            >
                <Card.Header>
                    <RelayPlatform platform={props.target.platform} />{' '}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{props.target.description}</Card.Title>
                    <Card.Text>
                        <a href={address}>{address}</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
