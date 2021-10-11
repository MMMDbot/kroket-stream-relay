const express = require('express')
const app = express()
const routes = require('./routes/routes')
const auth = require('./routes/auth')
const dashboard = require('./routes/dashboard')

// BodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serving static files so we can view HTML
app.use(express.static('public'))

// Prefix middleware
app.use('/api', routes)

// Authentication routes
app.use('/auth', auth)

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
