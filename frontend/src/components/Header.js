import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from './context/UserState'
import { Redirect } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

export default function Header() {
    const {
        state: { loggedIn, username },
    } = useUser()
    return (
        <div className="pancake-header">
            <header className="p-3 pancake-header">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/kroket.svg"
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                        />{' '}
                        Kroket Stream Studio
                    </Navbar.Brand>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="/dashboard">
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="/streams">
                                Streams
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="/targets">
                                Targets
                            </NavLink>
                        </li>
                    </ul>

                    <div className="text-end">
                        {loggedIn ? (
                            <NavLink className="nav-link" to="/profile">
                                {username}
                            </NavLink>
                        ) : (
                            <NavLink
                                type="button"
                                className="btn btn-outline-light me-2"
                                to="/login"
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}
