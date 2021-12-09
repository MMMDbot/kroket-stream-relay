import React from 'react'
import Header from './Header'
import Footer from './Footer'
import IngestForm from './IngestForm'
import ReactLoading from 'react-loading'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useUser } from './context/UserState'

export default function Home() {
    const {
        state: { loading },
    } = useUser()

    /* useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        if (!loggedIn) {
            fetch(
                'http://localhost:3001/auth-session/check-session',
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.loggedIn) {
                        dispatch({
                            type: 'logUser',
                            payload: {
                                loggedIn: data.loggedIn,
                                username: data.username,
                                userId: data.userid,
                                loading: false,
                            },
                        })
                    } else {
                        dispatch({
                            type: 'logOut',
                        })
                        history.push('/login')
                    }
                })
        }
    }, [dispatch, history, loggedIn]) */

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
                <Container
                    fluid
                    className="py-4"
                    style={{ minHeight: '100vh' }}
                >
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <IngestForm />
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
}
