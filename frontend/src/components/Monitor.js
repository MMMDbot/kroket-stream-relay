import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function Monitor() {
    return (
        <div>
            <Header />
            <Container fluid className="py-4" style={{ minHeight: '100vh' }}>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <Card bsPrefix="card-shadow card-round mb-4">
                            <Card.Body>
                                <h1>Monitor</h1>
                                <h2>Coming soon</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
