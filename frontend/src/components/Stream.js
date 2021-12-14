import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import StreamPlayer from './StreamPlayer'
import MultiSelect from './MultiSelect'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function Stream() {
    const [active, setActive] = useState(false)
    const [name, setName] = useState('Title')

    const { id } = useParams()

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(`http://localhost:3001/api/ingest/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.active) {
                    setActive(true)
                    setName(data.description)
                } else {
                    setActive(false)
                }
            })
    }, [id])

    const stopStream = () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(`http://localhost:3001/api/stop/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                //setButtonDisabled(true)
                setActive(true)
                console.log(data)
                //setReload({ value: !reload.value })
            })
    }

    return (
        <div>
            <Header />
            <Container className="py-4" style={{ minHeight: '100vh' }}>
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
                                <div className="float-end">
                                    <Button
                                        variant="danger"
                                        disabled={!active}
                                        onClick={stopStream}
                                    >
                                        Stop Stream
                                    </Button>
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
