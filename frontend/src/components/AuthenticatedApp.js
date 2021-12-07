import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import ProfilePage from './ProfilePage'
import Streams from './Streams'
import Stream from './Stream'
import TargetPage from './TargetPage'
import MultiSelect from './MultiSelect'
import SetPassword from './SetPassword'

export default function AuthenticatedApp() {
    return (
        <div>
            <Switch>
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
        </div>
    )
}
