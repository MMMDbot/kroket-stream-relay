import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import StreamPlayer from './StreamPlayer'
import MultiSelect from './MultiSelect'
import StreamTitle from './StreamTitle'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function Stream() {
    const [active, setActive] = useState(false)
    const [name, setName] = useState('Title')
    const API_SERVER = process.env.REACT_APP_API_SERVER

    const { id } = useParams()

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(`${API_SERVER}/api/ingest/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.active) {
                    setActive(true)
                    setName(data.description)
                } else {
                    setActive(false)
                }
            })
    }, [id, API_SERVER])

    const stopStream = () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(`${API_SERVER}/api/stop/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setActive(true)
                console.log(data)
            })
    }

    return (
        <div>
            <Header />
            <Container fluid className="py-4" style={{ minHeight: '100vh' }}>
                <Row className="p-4">
                    <Col></Col>
                    <Col sm={12} md={10} lg={8}>
                        <Card bsPrefix="card-shadow card-round mb-4">
                            <Card.Body>
                                <StreamPlayer
                                    streamId={id}
                                    active={active}
                                    name={name}
                                />
                                <div className="float-end"></div>
                                <div className="wrap">
                                    <div>
                                        <StreamTitle
                                            name={name}
                                            active={active}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            variant="danger"
                                            disabled={!active}
                                            onClick={stopStream}
                                        >
                                            Stop Stream
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card bsPrefix="card-shadow card-round">
                            <Card.Body>
                                <MultiSelect streamId={id} active={active} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
