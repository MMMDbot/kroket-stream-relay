import React from 'react'
import ReactLoading from 'react-loading'
import Header from './Header'
import Footer from './Footer'
import Stream from './Stream'

import { useUser } from './context/UserState'
import { useAuth } from '../utils/useAuth'

export default function Home() {
    const {
        state: { loading },
    } = useUser()

    useAuth('/login')

    if (loading) {
        return (
            <div>
                <ReactLoading type="spin" color="#000" />
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <Stream />
                <Footer />
            </div>
        )
    }
}
