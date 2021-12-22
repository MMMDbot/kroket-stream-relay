import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Monitor() {
    return (
        <div>
            <Header />
            <Container fluid className="py-4" style={{ minHeight: '100vh' }}>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <h1>Monitor</h1>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
