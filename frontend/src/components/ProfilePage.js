import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Profile from './Profile'
import { useUser } from './context/UserState'
import { useHistory } from 'react-router-dom'

export default function ProfilePage() {
    const {
        state: { loading },
    } = useUser()
    const { dispatch } = useUser()

    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    }

    const history = useHistory()

    useEffect(() => {
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
    }, [])

    if (loading) {
        return <div>Loading....</div>
    } else {
        return (
            <div>
                <Header />
                <Profile />
                <Footer />
            </div>
        )
    }
}