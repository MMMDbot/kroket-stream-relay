import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import WatermarkPreview from './WatermarkPreview'

export default function Watermark(props) {
    const [watermark, setWatermark] = useState(false)

    const submitTarget = (e) => {
        var data = new FormData()
        var imagedata = document.querySelector('input[type="file"]').files[0]
        data.append('wm', imagedata)
        e.preventDefault()
        console.log(props)
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: data,
        }

        fetch('http://localhost:3001/api/watermark', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.message)
                    console.log('exito')
                    setWatermark(!watermark)
                } else {
                    console.log('error')
                }
            })
    }

    return (
        <div>
            {props.user.username}
            <h2>Current watermark</h2>
            <WatermarkPreview user={props.user} watermark={watermark} />
            <h2>Change watermark</h2>
            <Form onSubmit={submitTarget}>
                <Row className="align-items-center">
                    <Col md="8" className="my-1">
                        <Form.Control type="file" id="inputGroupFile01" />
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button type="submit">Upload Watermark</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
