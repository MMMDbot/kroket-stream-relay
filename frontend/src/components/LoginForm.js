import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useUser } from './context/UserState'
import { useHistory } from 'react-router-dom'

export default function LoginForm() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const { dispatch } = useUser()

    const history = useHistory()

    const login = () => {
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
                }
            })
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter username"
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={login}>
                    Login
                </Button>
            </Form>
        </div>
    )
}
