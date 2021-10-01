const express = require('express')
const cors = require('cors')
// Added for express-promise-router
const Router = require('express-promise-router')
const router = new Router()
// Without express-promise-router
//const router = express.Router()
const {
    createIngestFolder,
    deleteIngestFolder,
} = require('../controllers/ingest')
const db = require('../data/users')

// Simple test route
router.get('/test', (req, res) => {
    res.json({ message: 'Welcome to the application inside routes.' })
})

router.post('/ingest', (req, res) => {
    const ingest = createIngestFolder()
    res.json(ingest)
})

router.post('/delete', (req, res) => {
    const deleteIngest = deleteIngestFolder(req.body.id)
    res.json(deleteIngest)
})

router.get('/users', async (req, res) => {
    const { rows } = await db.getUsers()
    res.json(rows)
})

router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.getUser(id)
    if (rows.length > 0) {
        res.json(rows[0])
    } else {
        res.json({ message: 'User not found' })
    }
})

module.exports = router
