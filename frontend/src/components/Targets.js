import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Target from './Target'

export default function Targets() {
    return (
        <div>
            <Row className="justify-content-center">Targets</Row>
            <Row>
                <Col>
                    <strong>Twitter</strong>
                </Col>
                <Col>
                    <strong>YouTube</strong>
                </Col>
                <Col>
                    <strong>Facebook</strong>
                </Col>
                <Col>
                    <strong>Dailymotion</strong>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Target />
                    <Target />
                    <Target />
                </Col>
                <Col>YouTube</Col>
                <Col>Facebook</Col>
                <Col>Dailymotion</Col>
            </Row>
        </div>
    )
}
