import React, { useEffect, useState } from 'react'
import { useUser } from './context/UserState'
import Watermark from './Watermark'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Table from 'react-bootstrap/Table'

function Profile() {
    const {
        state: { username, userId, loggedIn },
    } = useUser()

    const [user, setUser] = useState('')
    const API_SERVER = process.env.REACT_APP_API_SERVER

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(`${API_SERVER}/api/user/` + userId, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUser(data)
            })
    }, [loggedIn, userId, API_SERVER])

    return (
        <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Watermark />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            <div className="p-4">
                You are authenticated as {username}. Your user ID is {userId}
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Organization ID</th>
                            <th>Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.organization_id}</td>
                            <td>{user.created_at}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Profile
