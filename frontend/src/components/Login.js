import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import LoginForm from './LoginForm'
import LoginStatus from './LoginStatus'

import { useUser } from './context/UserState'
import { useHistory } from 'react-router-dom'

export default function Login() {
    const { dispatch } = useUser()
    const history = useHistory()

    const [loginLoading, setLoginLoading] = useState(true)

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
                if (data.loggedIn) {
                    dispatch({
                        type: 'logUser',
                        payload: {
                            loggedIn: data.loggedIn,
                            username: data.username,
                            userId: data.userid,
                            loading: false,
                        },
                    })
                    history.push('/')
                } else {
                    dispatch({
                        type: 'logOut',
                    })
                    setLoginLoading(false)
                }
            })
    }, [dispatch, history])

    if (loginLoading) {
        return <div>Loading....</div>
    } else {
        return (
            <div>
                <Header />
                <LoginForm />
                <LoginStatus />
                <Footer />
            </div>
        )
    }
}
