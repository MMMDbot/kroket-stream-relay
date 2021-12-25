import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

export default function VideoDownloader() {
    const [isFormLoading, setFormLoading] = useState(false)
    const [originUrl, setOriginUrl] = useState('')
    const [downloadLink, setDownloadLink] = useState('')
    const [formError, setFormError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLinkGenerated, setLinkGenerated] = useState(false)

    const submitVideoDownload = (e) => {
        e.preventDefault()
        setFormLoading(true)
        console.log(originUrl)
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: originUrl,
            }),
        }
        fetch('http://localhost:3001/api/download', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.url) {
                    setDownloadLink(data.url)
                    setFormLoading(false)
                    setLinkGenerated(true)
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

    return (
        <div>
            <Header />
            <Container fluid className="py-4" style={{ minHeight: '100vh' }}>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <Card bsPrefix="card-shadow card-round mb-4">
                            <Card.Body>
                                <h1>Video Downloader</h1>
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
                                <Form onSubmit={submitVideoDownload}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Paste the URL of your video here"
                                        onChange={(e) => {
                                            setOriginUrl(e.target.value)
                                        }}
                                        required
                                    />
                                    <Button
                                        className="mt-2"
                                        type="submit"
                                        disabled={isFormLoading}
                                    >
                                        {isFormLoading
                                            ? 'Generating download link...'
                                            : 'Generate Download Link 🚀'}
                                    </Button>
                                    <div
                                        className={
                                            isLinkGenerated
                                                ? 'pt-4 d-block'
                                                : 'd-none'
                                        }
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="Generated download link will appear here"
                                            value={downloadLink}
                                            readOnly
                                        />
                                        <a
                                            href={downloadLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Button
                                                disabled={!isLinkGenerated}
                                                className="mt-2"
                                            >
                                                Open link in new tab
                                            </Button>
                                        </a>
                                    </div>
                                </Form>
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
