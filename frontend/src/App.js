import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import ProfilePage from './components/ProfilePage'
import Streams from './components/Streams'
import Stream from './components/Stream'

import { StateTest, StateSetter } from './components/StateTest'

function App() {
    return (
        <Switch>
            <Route exact path="/state">
                <StateTest />
                <StateSetter />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/streams">
                <Streams />
            </Route>
            <Route path="/stream/:id">
                <Stream />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/profile">
                <ProfilePage />
            </Route>
        </Switch>
    )
}

export default App
