import React from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import StreamPlayer from './StreamPlayer'
import Relays from './Targets'
import MultiSelect from './MultiSelect'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Stream() {
    const { id } = useParams()
    return (
        <div>
            <Header />
            <Container>
                <Row className="p-4">
                    <Col></Col>
                    <Col sm={12} md={10} lg={8}>
                        <StreamPlayer streamId={id} />
                        <MultiSelect streamId={id} />
                        <Relays />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
