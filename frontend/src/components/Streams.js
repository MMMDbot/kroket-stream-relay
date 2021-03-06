import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import StreamCard from './StreamCard'
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import IngestForm from './IngestForm'
import SkeletonCard from './SkeletonCard'

export default function Streams() {
    const [streamList, setStreamList] = useState([])
    const [loading, setLoading] = useState(true)
    const API_SERVER = process.env.REACT_APP_API_SERVER

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(`${API_SERVER}/api/ingests`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setStreamList(data)
                setLoading(false)
            })
    }, [API_SERVER])

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
                        <Card bsPrefix="card-shadow card-round mb-4">
                            <Card.Body>
                                {loading ? (
                                    <SkeletonCard />
                                ) : streamList.length === 0 ? (
                                    <h2>No streams currently ingested</h2>
                                ) : (
                                    <CardGroup>{listItems}</CardGroup>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
