import React from 'react'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'

export default function SkeletonCard() {
    return (
        <div className="p-2">
            <Card style={{ width: '18rem' }}>
                <Card.Img
                    variant="top"
                    src="http://localhost:3001/img/thumbnail.jpeg"
                />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                        <Placeholder xs={8} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </div>
    )
}
