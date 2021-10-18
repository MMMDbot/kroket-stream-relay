import './App.css'
import { useEffect, useState, useContext } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useLocation,
    useHistory,
} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import Login from './components/Login'
import ProfilePage from './components/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import { UserProvider } from './components/context/UserState'
import { StateTest, StateSetter } from './components/StateTest'
import { useUser } from './components/context/UserState'

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
