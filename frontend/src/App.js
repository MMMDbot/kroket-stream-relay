import './App.css'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState({
        loggedIn: false,
        username: '',
    })

    function LoginStatus() {
        if (loginStatus.loggedIn) {
            return <h1>You are logged in as {loginStatus.username}</h1>
        } else {
            return <h1>You are NOT logged in...</h1>
        }
    }

    const login = () => {
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }
        fetch('http://localhost:3001/auth-session/login', requestOptions)
            .then((response) => response.json())
            .then((data) =>
                setLoginStatus({ loggedIn: true, username: data.username })
            )
    }
    const login2 = () => {
        const requestOptions = {
            method: 'GET',
        }
        fetch('http://localhost:3001/auth-session/', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(
            'http://localhost:3001/auth-session/check-session',
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.loggedIn === true) {
                    console.log(data.username)
                    setLoginStatus({ loggedIn: true, username: data.username })
                } else {
                    console.log('not logged in')
                }
            })
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <LoginStatus />
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Enter username"
                            onChange={(e) => {
                                setUsername(e.target.value)
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
                    <Button variant="primary" type="button" onClick={login2}>
                        Get Test
                    </Button>
                </Form>
            </header>
        </div>
    )
}

export default App
