import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Watermark(props) {
    const submitTarget = (e) => {
        e.preventDefault()
        console.log('holi')
        /*         setFormLoading(true)
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
            }) */
    }

    return (
        <div>
            {props.user.username}
            <Form onSubmit={submitTarget}>
                <Row className="align-items-center">
                    <Col md="8" className="my-1">
                        <Form.Control type="file" />
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button type="submit">Upload Watermark</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
