import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import WatermarkPreview from './WatermarkPreview'

export default function Watermark() {
    const [watermark, setWatermark] = useState(false)
    const [isFormLoading, setFormLoading] = useState(false)
    const imageInputRef = useRef()
    const API_SERVER = process.env.REACT_APP_API_SERVER

    const submitTarget = (e) => {
        e.preventDefault()
        setFormLoading(true)

        var data = new FormData()
        var imagedata = document.querySelector('input[type="file"]').files[0]
        data.append('wm', imagedata)

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: data,
        }

        fetch(`${API_SERVER}/api/watermark`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.message)
                    console.log('exito')
                    setWatermark(!watermark)
                    setFormLoading(false)
                    imageInputRef.current.value = ''
                } else {
                    console.log('error')
                    setFormLoading(false)
                }
            })
    }

    return (
        <div>
            <h2>Current watermark</h2>
            <WatermarkPreview watermark={watermark} />
            <h2>Change watermark</h2>
            <h4>(66x66 PNG images only)</h4>
            <Form onSubmit={submitTarget}>
                <Row>
                    <Col md="8">
                        <Form.Control
                            type="file"
                            id="inputGroupFile01"
                            ref={imageInputRef}
                        />
                    </Col>
                    <Col md="4">
                        <div className="d-grid">
                            <Button type="submit" disabled={isFormLoading}>
                                {isFormLoading
                                    ? 'Uploading…'
                                    : 'Upload watermark'}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
