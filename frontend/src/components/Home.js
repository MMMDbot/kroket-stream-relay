import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import LoginStatus from './LoginStatus'

import { useUser } from './context/UserState'
import { useHistory } from 'react-router-dom'

export default function Home() {
    const {
        state: { loading },
    } = useUser()

    const { dispatch } = useUser()

    const history = useHistory()

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
                } else {
                    dispatch({
                        type: 'logOut',
                    })
                    history.push('/login')
                }
            })
    }, [dispatch, history])

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <Header />
                <LoginStatus />
                <Footer />
            </div>
        )
    }
}
