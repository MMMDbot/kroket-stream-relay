const express = require('express')
const cors = require('cors')
// Added for express-promise-router
const Router = require('express-promise-router')
const router = new Router()
// Without express-promise-router
//const router = express.Router()
const {
    ingest,
    relay,
    stop,
    createIngestFolder,
    deleteIngestFolder,
} = require('../controllers/ingest')
const db = require('../data/users')

// Simple test route
router.get('/test', (req, res) => {
    res.json({ message: 'Welcome to the application inside routes.' })
})

router.post('/ingest', (req, res) => {
    const id = createIngestFolder()
    const { origin } = req.body
    const task = ingest(id, origin)
    console.log(ingest)
    res.json('done')
})

router.post('/relay', (req, res) => {
    const { id, server, streamKey } = req.body
    const relayStream = relay(id, server, streamKey)
    res.json({ id: id, server: server, streamkey: streamKey })
})

router.post('/task', (req, res) => {
    const task = ingest('asdf')
    res.json(task)
})

router.post('/delete', (req, res) => {
    const deletedFolder = deleteIngestFolder(req.body.id)
    res.json(deletedFolder)
})

router.post('/stop/:id', (req, res) => {
    const { id } = req.params
    const task = stop(id)
    res.json(task)
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
