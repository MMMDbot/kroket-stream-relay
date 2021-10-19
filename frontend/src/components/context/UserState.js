import { useReducer, createContext, useContext } from 'react'

const UserContext = createContext()

function userReducer(state, action) {
    switch (action.type) {
        case 'increment': {
            return {
                count: state.count + 1,
                loggedIn: state.loggedIn,
                username: state.username,
            }
        }
        case 'decrement': {
            return {
                count: state.count - 1,
                loggedIn: state.loggedIn,
                username: state.username,
            }
        }
        case 'set': {
            return {
                count: action.payload.count,
                loggedIn: state.loggedIn,
                username: state.username,
            }
        }
        case 'logUser': {
            return {
                loggedIn: action.payload.loggedIn,
                username: action.payload.username,
                userId: action.payload.userId,
                count: state.count,
                loading: action.payload.loading,
            }
        }
        case 'logOut': {
            return {
                loggedIn: false,
                username: '',
                userId: 0,
                loading: false,
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, {
        loggedIn: '',
        username: '',
        userId: 0,
        loading: true,
    })
    const value = { state, dispatch }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
export { UserProvider, useUser }
