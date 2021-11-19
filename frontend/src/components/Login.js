import React from 'react'
import Header from './Header'
import Footer from './Footer'
import LoginForm from './LoginForm'
import LoginStatus from './LoginStatus'
import ReactLoading from 'react-loading'

import { useUser } from './context/UserState'
import { useHistory, Redirect } from 'react-router-dom'

import { useAuth } from '../utils/useAuth'

export default function Login() {
    /*     const { dispatch } = useUser()

    const [loginLoading, setLoginLoading] = useState(true) */

    const {
        state: { loggedIn, loading },
    } = useUser()

    useAuth('/login')

    const history = useHistory()

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
                <ReactLoading type="spin" color="#000" />
            </div>
        )
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
