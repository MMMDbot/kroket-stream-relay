import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from './context/UserState'
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from '../utils/useAuth'

export default function Header() {
    const {
        state: { username },
    } = useUser()
    useAuth('/login')
    return (
        <div className="pancake-header">
            <header className="p-3 pancake-header">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Navbar.Brand>
                        <NavLink to="/">
                            <img
                                alt=""
                                src="/kroket.svg"
                                width="35"
                                height="35"
                                className="d-inline-block align-top"
                            />{' '}
                            Kroket Stream Studio
                        </NavLink>
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
                        <NavLink className="nav-link" to="/profile">
                            {username}
                        </NavLink>
                    </div>
                </div>
            </header>
        </div>
    )
}
