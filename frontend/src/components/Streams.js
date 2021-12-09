import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import StreamCard from './StreamCard'
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IngestForm from './IngestForm'
import SkeletonCard from './SkeletonCard'

export default function Streams() {
    const [streamList, setStreamList] = useState([])
    const [loading, setLoading] = useState(true)

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
                setLoading(false)
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

    return (
        <div>
            <Header />
            <Container fluid className="py-4" style={{ minHeight: '100vh' }}>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <IngestForm />
                        {loading ? (
                            <SkeletonCard />
                        ) : (
                            <CardGroup>{listItems}</CardGroup>
                        )}
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
