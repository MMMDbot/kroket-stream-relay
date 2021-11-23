import React from 'react'
import Card from 'react-bootstrap/Card'
import StatusBadge from './StatusBadge'

export default function StreamCard(props) {
    const link = props.active ? `/stream/${props.job_id}` : null

    return (
        <div className="p-2">
            <Card style={{ width: '12rem' }}>
                <a href={link}>
                    <Card.Img
                        variant="top"
                        src="http://localhost:3001/img/play_ph.jpg"
                    />
                </a>
                <Card.Body>
                    <StatusBadge active={props.active} />
                    <Card.Title>
                        <a href={link}>
                            <strong>{props.description}</strong>
                        </a>
                    </Card.Title>
                    <Card.Text>
                        Started {props.created_at}
                        Created by user {props.user_id}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
