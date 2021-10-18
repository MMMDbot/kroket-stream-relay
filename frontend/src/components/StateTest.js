import { useEffect } from 'react'
import { useUser } from './context/UserState'

function StateTest() {
    const {
        state: { count, loggedIn, username },
    } = useUser()
    return (
        <div>
            <ul>
                <li>{`The current count is ${count}`}</li>
                <li>{`The current status of login is ${loggedIn}`}</li>
                <li>{`The current username is ${username}`}</li>
            </ul>
        </div>
    )
}

function StateSetter() {
    const { dispatch } = useUser()

    const {
        state: { loggedIn },
    } = useUser()

    useEffect(() => {
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
                    dispatch({
                        type: 'logUser',
                        payload: {
                            loggedIn: data.loggedIn,
                            username: data.username,
                            userId: data.userid,
                        },
                    })
                })
        }
    }, [dispatch, loggedIn])
    return (
        <div>
            <button onClick={() => dispatch({ type: 'increment' })}>
                Increment count
            </button>
            <button onClick={() => dispatch({ type: 'decrement' })}>
                Reduce count
            </button>
        </div>
    )
}

export { StateTest, StateSetter }
