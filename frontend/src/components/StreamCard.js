import React from 'react'
import Card from 'react-bootstrap/Card'
import StatusBadge from './StatusBadge'
import useTimestamp from '../utils/useTimestamp'

export default function StreamCard({
    active,
    created_at,
    job_id,
    description,
    user_id,
}) {
    const link = active ? `/stream/${job_id}` : null
    const timestamp = useTimestamp(created_at)
    const API_SERVER = process.env.REACT_APP_API_SERVER

    return (
        <div className="p-2">
            <Card
                bsPrefix="card-round card-shadow"
                style={{ width: '15rem', height: '17rem' }}
            >
                <a href={link}>
                    <Card.Img
                        variant="top"
                        src={
                            active
                                ? `${API_SERVER}/streams/${job_id}/thumbnail.jpeg`
                                : `${API_SERVER}/img/thumbnail.jpeg`
                        }
                    />
                </a>
                <Card.Body>
                    <StatusBadge active={active} />
                    <Card.Title>
                        <a href={link} title={description}>
                            <strong>
                                {description.length > 25
                                    ? `${description.substring(0, 24)}...`
                                    : description}
                            </strong>
                        </a>
                    </Card.Title>
                    <Card.Text>
                        {timestamp} by user {user_id}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
