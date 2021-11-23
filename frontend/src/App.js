import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import ProfilePage from './components/ProfilePage'
import Streams from './components/Streams'
import Stream from './components/Stream'
import TargetPage from './components/TargetPage'
import MultiSelect from './components/MultiSelect'
import SetPassword from './components/SetPassword'

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
            <Route exact path="/targets">
                <TargetPage />
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
            <Route exact path="/multiselect">
                <MultiSelect />
            </Route>
            <Route exact path="/setpw/:id">
                <SetPassword />
            </Route>
        </Switch>
    )
}

export default App
