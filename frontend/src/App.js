import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthenticatedApp from './components/AuthenticatedApp'
import UnAuthenticatedApp from './components/UnAuthenticatedApp'

import { useUser } from './components/context/UserState'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
    const {
        state: { loggedIn },
    } = useUser()

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                {loggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />}{' '}
            </QueryClientProvider>
        </div>
    )
}

export default App
