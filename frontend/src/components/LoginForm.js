import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useUser } from './context/UserState'
import { useHistory } from 'react-router-dom'

export default function LoginForm() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isFormLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState(false)

    const { dispatch } = useUser()

    const history = useHistory()

    const login = (e) => {
        e.preventDefault()
        setFormLoading(true)
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: name,
                password: password,
            }),
        }

        fetch('http://localhost:3001/auth-session/login', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.username) {
                    dispatch({
                        type: 'logUser',
                        payload: {
                            loggedIn: true,
                            username: data.username,
                            userId: data.userid,
                        },
                    })
                    history.push('/')
                } else {
                    console.log(data.message)
                    setFormError(true)
                    setFormLoading(false)
                }
            })
    }
    return (
        <div>
            <Container className="pt-4">
                <Row>
                    <Col md={3} lg={4}></Col>
                    <Col md={6} lg={4}>
                        <Card bsPrefix="card-round card-shadow">
                            <Card.Header>
                                <h3 className="text-center">Log in</h3>
                            </Card.Header>
                            <Card.Body>
                                {formError ? (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setFormError(false)}
                                        dismissible
                                    >
                                        Incorrect user or password
                                    </Alert>
                                ) : (
                                    ''
                                )}
                                <Form onSubmit={login}>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicUsername"
                                    >
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="username"
                                            placeholder="Enter username"
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                    </Form.Group>
                                    <div className="d-grid gap-2 pt-2">
                                        <Button
                                            variant="primary"
                                            disabled={isFormLoading}
                                            type="submit"
                                        >
                                            {isFormLoading
                                                ? 'Loading…'
                                                : 'Login'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} lg={4}></Col>
                </Row>
            </Container>
        </div>
    )
}
