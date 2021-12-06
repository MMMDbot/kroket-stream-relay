import { useEffect } from 'react'
import { useUser } from '../components/context/UserState'
import { useHistory } from 'react-router-dom'

function useAuth(redirect) {
    const { dispatch } = useUser()
    const history = useHistory()

    const {
        state: { loggedIn },
    } = useUser()

    const auth = useEffect(() => {
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
                    history.push(redirect)
                }
            })
    }, [dispatch, history, loggedIn, redirect])

    return auth
}

export { useAuth }
