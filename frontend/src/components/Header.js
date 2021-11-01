import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from './context/UserState'

export default function Header() {
    const {
        state: { loggedIn, username },
    } = useUser()
    return (
        <div>
            <header className="p-3 bg-dark text-white">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a
                        href="/"
                        className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
                    >
                        <svg
                            className="bi me-2"
                            width="40"
                            height="32"
                            role="img"
                            aria-label="Bootstrap"
                        ></svg>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <NavLink
                                className="nav-link px-2 text-white"
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="nav-link px-2 text-white"
                                to="/dashboard"
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="nav-link px-2 text-white"
                                to="/streams"
                            >
                                Streams
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="nav-link px-2 text-white"
                                to="/targets"
                            >
                                Targets
                            </NavLink>
                        </li>
                    </ul>

                    <div className="text-end">
                        {loggedIn ? (
                            <NavLink
                                className="nav-link px-2 text-white"
                                to="/profile"
                            >
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
