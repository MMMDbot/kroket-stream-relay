const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/routes')
const auth = require('./routes/auth')
const dashboard = require('./routes/dashboard')
const auth_session = require('./routes/auth-session')
const io = require('socket.io')(8080, {
    cors: { origin: ['http://localhost:3000'] },
})

// BodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS for calls from React app
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
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
//
io.on('connection', (socket) => {
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
