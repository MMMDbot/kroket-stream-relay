const express = require('express')
const cors = require('cors')
const router = express.Router()
const ingest = require('../controllers/ingest')

// Simple test route
router.get('/test', (req, res) => {
    res.json({ message: 'Welcome to the application inside routes.' })
})

router.post('/ingest', (req, res) => {
    ingest()
    console.log(req.body)
    res.json(req.body)
})

module.exports = router
