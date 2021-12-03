import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { validateIngestForm } from '../utils/validate'

export default function IngestForm() {
    const [isFormLoading, setFormLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [origin, setOrigin] = useState('')
    const [formError, setFormError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory()

    const submitIngest = (e) => {
        e.preventDefault()
        setFormLoading(true)
        if (validateIngestForm(origin) === false) {
            e.preventDefault()
            e.stopPropagation()
            setErrorMessage('Invalid Origin URL.')
            setFormError(true)
            setFormLoading(false)
        } else {
            const requestOptions = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description: description,
                    origin: origin,
                }),
            }

            fetch('http://localhost:3001/api/ingest', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.streamId) {
                        history.push(`/stream/${data.streamId}`)
                    } else {
                        setErrorMessage(
                            data.message
                                ? data.message
                                : 'Server error processing ingest.'
                        )
                        setFormError(true)
                        setFormLoading(false)
                    }
                })
        }
    }
    return (
        <Container fluid style={{ minHeight: '100vh' }} className="pt-4">
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <Row className="pb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <h3>Start New Ingest</h3>
                        </Col>
                    </Row>
                    <Row className="pb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            {formError ? (
                                <Alert
                                    variant="danger"
                                    onClose={() => setFormError(false)}
                                    dismissible
                                >
                                    {errorMessage}
                                </Alert>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                    <Form onSubmit={submitIngest}>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formHorizontalEmail"
                            required
                        >
                            <Form.Label column sm={2}>
                                Description
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Description"
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formHorizontalPassword"
                        >
                            <Form.Label column sm={2}>
                                Origin
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Origin"
                                    onChange={(e) => {
                                        setOrigin(e.target.value)
                                    }}
                                    required
                                />
                                <Form.Text id="originHelpBlock" muted>
                                    Origin must be a URL pointing to a HLS
                                    playlist (.m3u8 file) or a YouTube URL.
                                    Valid examples:
                                    https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
                                    https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit" disabled={isFormLoading}>
                                    {isFormLoading
                                        ? 'Starting ingest...'
                                        : 'Start Ingest 🚀'}
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={2}></Col>
            </Row>
        </Container>
    )
}
