import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

export default function SetPassword() {
    const { id } = useParams()
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [variant, setVariant] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const API_SERVER = process.env.REACT_APP_API_SERVER

    const submitPw = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: password,
            }),
        }
        fetch(`${API_SERVER}/api/user/setpw/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setAlertMessage(data.message)
                if (data.success) {
                    setVariant('success')
                } else {
                    setVariant('danger')
                }
                setShow(true)
            })
    }

    return (
        <div>
            <Container>
                <div className="my-4">
                    <h1>Set Password for your user</h1>
                    <Form onSubmit={submitPw}>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <div className="py-2">
                        <Alert
                            show={show}
                            variant={variant}
                            onClose={() => setShow(false)}
                            dismissible
                        >
                            {alertMessage}
                        </Alert>
                    </div>
                </div>
            </Container>
        </div>
    )
}
