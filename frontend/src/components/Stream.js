import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import StreamPlayer from './StreamPlayer'
import MultiSelect from './MultiSelect'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <Row className="p-4">
                    <Col></Col>
                    <Col sm={12} md={10} lg={8}>
                        <StreamPlayer
                            streamId={id}
                            active={active}
                            name={name}
                        />
                        <MultiSelect streamId={id} active={active} />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
//<Relays />
