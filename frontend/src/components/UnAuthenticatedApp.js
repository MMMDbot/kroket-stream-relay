import React from 'react'
import Login from './Login'
import useTitle from '../utils/useTitle'

export default function UnAuthenticatedApp() {
    useTitle('Kroket Stream Relay')
    return (
        <div>
            <Login />
        </div>
    )
}
