import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'

export default function Header() {
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
                </div>
            </header>
        </div>
    )
}
