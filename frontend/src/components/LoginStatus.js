import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useUser } from './context/UserState'

export default function LoginStatus() {
    const {
        state: { count, loggedIn, username, userId },
    } = useUser()
    return (
        <div>
            <ul>
                <li>{`The current count is ${count}`}</li>
                <li>{`The current status of login is ${loggedIn}`}</li>
                <li>{`The current username is ${username}`}</li>
                <li>{`The current user ID is ${userId}`}</li>
            </ul>
        </div>
    )
}
