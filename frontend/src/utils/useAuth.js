import { useUser } from '../components/context/UserState'
import { useHistory } from 'react-router-dom'

import { useQuery } from 'react-query'

function useAuth(redirect) {
    const { dispatch } = useUser()
    const history = useHistory()
    const API_SERVER = process.env.REACT_APP_API_SERVER

    useQuery(
        'checkSession',
        () => {
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
            }
            fetch(`${API_SERVER}/auth-session/check-session`, requestOptions)
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
        },
        {
            staleTime: 20000,
        }
    )
}

export { useAuth }
