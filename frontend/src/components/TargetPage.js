import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Targets from './Targets'
import TargetForm from './TargetForm'
import ReactLoading from 'react-loading'

import { useUser } from './context/UserState'
import { useAuth } from '../utils/useAuth'

export default function Home() {
    const {
        state: { loading },
    } = useUser()

    useAuth('/login')
    /* useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        if (!loggedIn) {
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
        }
    }, [dispatch, history, loggedIn]) */

    if (loading) {
        return (
            <div>
                <ReactLoading type="spin" color="#000" />
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <TargetForm />
                <Targets />
                <Footer />
            </div>
        )
    }
}
