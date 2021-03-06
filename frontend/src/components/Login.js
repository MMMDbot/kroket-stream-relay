import React from 'react'
import UnauthenticatedHeader from './UnauthenticatedHeader'
import Footer from './Footer'
import LoginForm from './LoginForm'
import LoginStatus from './LoginStatus'
import Loading from './Loading'
import Container from 'react-bootstrap/Container'

import { useUser } from './context/UserState'
import { Redirect } from 'react-router-dom'

import { useAuth } from '../utils/useAuth'

export default function Login() {
    /*     const { dispatch } = useUser()

    const [loginLoading, setLoginLoading] = useState(true) */

    const {
        state: { loggedIn, loading },
    } = useUser()

    useAuth('/login')

    /* useEffect(() => {
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
 */
    if (loggedIn) {
        return <Redirect push to="/" />
    }

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    } else {
        return (
            <div>
                <UnauthenticatedHeader />
                <Container
                    fluid
                    className="pt-4"
                    style={{ minHeight: '100vh' }}
                >
                    <LoginForm />
                </Container>
                <LoginStatus />
                <Footer />
            </div>
        )
    }
}
