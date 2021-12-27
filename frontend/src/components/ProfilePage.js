import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Profile from './Profile'
import Container from 'react-bootstrap/Container'

export default function ProfilePage() {
    return (
        <div>
            <Header />
            <Container fluid className="pt-4" style={{ minHeight: '100vh' }}>
                <Profile />
            </Container>
            <Footer />
        </div>
    )
}
