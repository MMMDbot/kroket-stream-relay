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
    const [server, setServer] = useState('')
    const [publicUrl, setPublicUrl] = useState('')
    const [streamKey, setStreamKey] = useState('')
    const [platform, setPlatform] = useState('')
    const [description, setDescription] = useState('')
    const [formError, setFormError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [formSuccess, setFormSuccess] = useState(false)

    const history = useHistory()

    const submitTarget = (e) => {
        e.preventDefault()
        setFormLoading(true)
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                server: server,
                stream_key: streamKey,
                description: description,
                public_url: publicUrl,
                platform: platform,
            }),
        }

        fetch('http://localhost:3001/api/target/add', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.message)
                    setFormLoading(false)
                    setFormSuccess(true)
                    resetForm()
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
    const resetForm = () => {
        setServer('')
        setPublicUrl('')
        setStreamKey('')
        setPlatform('')
        setDescription('')
    }

    return (
        <div>
            <Container className="pt-4">
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <Row className="pb-1">
                            <Col sm={{ span: 10, offset: 1 }}>
                                <h3>Add New Target</h3>
                            </Col>
                        </Row>
                        <Row className="pb-1">
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
                        <Form onSubmit={submitTarget}>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formHorizontalEmail"
                                required
                            >
                                <Form.Label column sm={1}>
                                    Server
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Server Address"
                                        onChange={(e) => {
                                            setServer(e.target.value)
                                        }}
                                        value={server}
                                        required
                                    />
                                </Col>
                                <Form.Label column sm={1}>
                                    Key
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Stream Key"
                                        onChange={(e) => {
                                            setStreamKey(e.target.value)
                                        }}
                                        value={streamKey}
                                        required
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formHorizontalPassword"
                            >
                                <Form.Label column sm={1}>
                                    Desc.
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Description"
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }}
                                        value={description}
                                        required
                                    />
                                </Col>
                                <Form.Label column sm={1}>
                                    Site
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        onChange={(e) => {
                                            setPlatform(e.target.value)
                                        }}
                                        value={platform}
                                    >
                                        <option>Select Platform</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="youtube">YouTube</option>
                                        <option value="facebook">
                                            Facebook
                                        </option>
                                        <option value="dailymotion">
                                            Dailymotion
                                        </option>
                                        <option value="custom">
                                            Other Platform
                                        </option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formHorizontalPassword"
                            >
                                <Form.Label column sm={1}>
                                    URL
                                </Form.Label>
                                <Col sm={11}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Public facing URL"
                                        onChange={(e) => {
                                            setPublicUrl(e.target.value)
                                        }}
                                        value={publicUrl}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 3, offset: 1 }}>
                                    <Button
                                        type="submit"
                                        disabled={isFormLoading}
                                    >
                                        {isFormLoading
                                            ? 'Adding target...'
                                            : 'Add target 🎃'}
                                    </Button>
                                </Col>
                                <Col sm={{ span: 8, offset: 0 }}>
                                    {formSuccess ? (
                                        <Alert
                                            variant="success"
                                            onClose={() =>
                                                setFormSuccess(false)
                                            }
                                            dismissible
                                        >
                                            'Target added!'{' '}
                                        </Alert>
                                    ) : (
                                        ''
                                    )}
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>
        </div>
    )
}
