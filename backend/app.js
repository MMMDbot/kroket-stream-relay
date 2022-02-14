const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/routes')
const auth = require('./routes/auth')
const dashboard = require('./routes/dashboard')
const auth_session = require('./routes/auth-session')
const io = require('socket.io')(8080, {
    cors: { origin: ['*'] },
})
require('dotenv').config()

// BodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS for calls from React app
app.use(
    cors({
        origin: process.env.CORS_ORIGINS.split(', '),
        methods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
    })
)

// Serving static files so we can view HTML
app.use(express.static('public'))

// Prefix middleware
app.use('/api', routes)

// Authentication routes
app.use('/auth', auth)

// Session-based authentication routes
app.use('/auth-session', auth_session)

// Dashboard routes
app.use('/dashboard', dashboard)

// Simple test route
app.get('/test', (req, res) => {
    res.json({ message: 'Welcome to the application.' })
})

const server = app.listen(3001, () => {
    const host = server.address().address
    const port = server.address().port

    console.log('Listening on %s port %s', host, port)
})

// SOCKET IO TEST AREA
// tread carefully
// spooky

//io.once instead of io.on to avoid repetition in logging
io.once('connection', (socket) => {
    console.log('pito')
    console.log(socket.id)
})

app.get('/socket/online', (req, res) => {
    io.emit('receive-message', 'online')
    res.json({ message: 'Event emitted' })
})

app.get('/socket/offline', (req, res) => {
    io.emit('receive-message', 'offline')
    res.json({ message: 'Event emitted' })
})

app.get('/socket/ingest/:job_id/:status', (req, res) => {
    const { job_id, status } = req.params
    if (status === 'online') {
        io.emit(job_id, 'Online')
        res.json({ message: 'Ingest Online event emitted' })
    } else if (status === 'offline') {
        io.emit(job_id, 'Offline')
        res.json({ message: 'Ingest Offline event emitted' })
    } else {
        res.json({
            message:
                'Error sending ingest status. Only online or offline supported.',
        })
    }
})

app.get('/socket/relay/:job_id/:status', (req, res) => {
    const { job_id, status } = req.params
    if (status === 'online') {
        io.emit(job_id, 'Online')
        res.json({ message: 'Relay Online event emitted' })
    } else if (status === 'offline') {
        io.emit(job_id, 'Offline')
        res.json({ message: 'Relay Offline event emitted' })
    } else {
        res.json({
            message:
                'Error sending relay status. Only online or offline supported.',
        })
    }
})
