import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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
    /*     if (state.loggedIn) {
        return <h1>You are logged in as {state.username}</h1>
    } else {
        return <h1>You are NOT logged in...</h1>
    } */
}
