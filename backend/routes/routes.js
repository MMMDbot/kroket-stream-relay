const express = require('express')
const cors = require('cors')
const router = express.Router()

// Simple test route
router.get('/test', (req, res) => {
    res.json({ message: 'Welcome to the application inside routes.' })
})

module.exports = router
