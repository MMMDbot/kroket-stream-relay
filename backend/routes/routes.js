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
} = require('../services/ingest')
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
    try {
        const { rows } = await db.getUsers()
        res.json(rows)
    } catch (error) {
        res.json(error.severity)
    }
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

router.post('/user/add', async (req, res) => {
    const { username, password_hash, email, full_name, organization_id } =
        req.body
    try {
        const result = await db.addUser(
            username,
            password_hash,
            email,
            full_name,
            organization_id
        )
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

router.get('/organizations', async (req, res) => {
    const { rows } = await db.getOrganizations()
    res.json(rows)
})

router.get('/organization/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.getOrganization(id)
    if (rows.length === 1) {
        res.json(rows[0])
    } else {
        res.json({ message: 'Organization not found' })
    }
})

router.post('/organization/add', async (req, res) => {
    const { orgname, address, phone } = req.body
    const result = await db.addOrganization(orgname, address, phone)
    res.json({ mesage: 'Organization added' })
})

router.get('/ingests', async (req, res) => {
    const { rows } = await db.getIngests()
    res.json(rows)
})

router.get('/ingest/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.getIngest(id)
    if (rows.length === 1) {
        res.json(rows[0])
    } else {
        res.json({ message: 'Ingest not found' })
    }
})

router.post('/ingest/add', async (req, res) => {
    const { folder, job_id, description, user_id } = req.body
    const result = await db.addIngest(folder, job_id, description, user_id)
    res.json({ mesage: 'Ingest added' })
})

router.get('/relays', async (req, res) => {
    const { rows } = await db.getRelays()
    res.json(rows)
})

router.get('/relay/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.getRelay(id)
    if (rows.length === 1) {
        res.json(rows[0])
    } else {
        res.json({ message: 'Relay not found' })
    }
})

router.post('/relay/add', async (req, res) => {
    const { ingest_id, target_id, description, user_id, job_id } = req.body
    const result = await db.addRelay(
        ingest_id,
        target_id,
        description,
        user_id,
        job_id
    )
    res.json({ mesage: 'Relay added' })
})

router.get('/targets', async (req, res) => {
    const { rows } = await db.getTargets()
    res.json(rows)
})

router.get('/target/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.getTarget(id)
    if (rows.length === 1) {
        res.json(rows[0])
    } else {
        res.json({ message: 'Target not found' })
    }
})

router.post('/target/add', async (req, res) => {
    const { server, stream_key, description, public_url, platform, user_id } =
        req.body
    const result = await db.addTarget(
        server,
        stream_key,
        description,
        public_url,
        platform,
        user_id
    )
    res.json({ mesage: 'Target added' })
})

module.exports = router
