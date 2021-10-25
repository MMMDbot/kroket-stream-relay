import React from 'react'
import Card from 'react-bootstrap/Card'

export default function StreamCard(props) {
    return (
        <div className="p-2">
            <Card style={{ width: '12rem' }}>
                <a href={`/stream/${props.job_id}`}>
                    <Card.Img
                        variant="top"
                        src="http://localhost:3001/img/play_ph.jpg"
                    />
                </a>
                <Card.Body>
                    <Card.Title>
                        <a href={`/stream/${props.job_id}`}>
                            <strong>{props.description}</strong>
                        </a>
                    </Card.Title>
                    <Card.Text>
                        <ul>
                            <li>Started {props.created_at}</li>
                            <li>Created by user {props.user_id}</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}