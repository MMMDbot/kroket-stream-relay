import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { useUser } from './context/UserState'
import Header from './Header'
import { StateTest, StateSetter } from './StateTest'

import Table from 'react-bootstrap/Table'

function Profile() {
    const {
        state: { username, userId, loggedIn, loading },
    } = useUser()
    const { dispatch } = useUser()

    const [user, setUser] = useState('')
    const [loadingData, setLoadingData] = useState(true)

    const history = useHistory()

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch('http://localhost:3001/api/user/' + userId, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUser(data)
                setLoadingData(false)
            })
    }, [loggedIn])

    if (loadingData) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
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
                You are authenticated as {username}. Your user ID is {userId}
            </div>
        )
    }
}

export default withRouter(Profile)
