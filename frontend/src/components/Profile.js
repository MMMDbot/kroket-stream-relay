import React, { useEffect, useState } from 'react'
import { useUser } from './context/UserState'
import ReactLoading from 'react-loading'
import Watermark from './Watermark'

import Table from 'react-bootstrap/Table'

function Profile() {
    const {
        state: { username, userId, loggedIn },
    } = useUser()

    const [user, setUser] = useState('')
    const [loadingData, setLoadingData] = useState(true)

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
    }, [loggedIn, userId])

    if (loadingData) {
        return (
            <div>
                <ReactLoading type="spin" color="#000" />
            </div>
        )
    } else {
        return (
            <div className="p-4">
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
                <Watermark user={user} />
                You are authenticated as {username}. Your user ID is {userId}
            </div>
        )
    }
}

export default Profile
