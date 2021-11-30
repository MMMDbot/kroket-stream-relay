import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import Header from './Header'
import Footer from './Footer'
import StreamCard from './StreamCard'
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container'

import { useUser } from './context/UserState'
import { useAuth } from '../utils/useAuth'

export default function Streams() {
    const {
        state: { loading },
    } = useUser()

    useAuth('/login')

    const [streamList, setStreamList] = useState([])

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch('http://localhost:3001/api/ingests', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setStreamList(data)
            })
    }, [])

    /*     const listItems = streamList.map((number) => (
        < key={number.job_id}>
            <a href={`/stream/${number.folder}`}>{number.description}</a>
        </li>
    )) */
    const listItems = streamList.map((number) => (
        <StreamCard
            key={number.job_id}
            job_id={number.job_id}
            description={number.description}
            created_at={number.created_at}
            user_id={number.user_id}
            active={number.active}
        />
    ))
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
                <Container className="py -4" style={{ minHeight: '100vh' }}>
                    <CardGroup>{listItems}</CardGroup>
                </Container>
                <Footer />
            </div>
        )
    }
}
