import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthenticatedApp from './components/AuthenticatedApp'
import UnAuthenticatedApp from './components/UnAuthenticatedApp'

import { useUser } from './components/context/UserState'

function App() {
    const {
        state: { loggedIn },
    } = useUser()

    return (
        <div>{loggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />} </div>
    )
}

export default App
