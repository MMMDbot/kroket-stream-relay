const express = require('express')
const cors = require('cors')
// Added for express-promise-router
const Router = require('express-promise-router')
const router = new Router()
const genThumbnail = require('simple-thumbnail')
const session = require('express-session')
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
const { hashPassword } = require('../services/user')
const redis = require('redis')
const connectRedis = require('connect-redis')
const authSession = require('../middlewares/auth-session')
const multer = require('multer')
const { downloadVideo } = require('../services/videoDownloader')
const YTDlpWrap = require('yt-dlp-wrap').default

const RedisStore = connectRedis(session)

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})

router.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.JWTSECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 10,
        },
    })
)

// Simple test route
router.get('/test', (req, res) => {
    res.json({ message: 'Welcome to the application inside routes.' })
})

router.post('/ingest', async (req, res) => {
    const userid = req.session.userid
    const { origin, description } = req.body
    try {
        const id = await ingest(description, origin, userid)
        res.json(id)
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
    //const id = createIngestFolder()
    /* const { origin, description } = req.body
    if (!origin || !description) {
        res.json('Error')
    }
    console.log(req.session.userid)
    const task = encodeIngest(id, origin)
    const result = await db.addIngest(
        id,
        id,
        description,
        req.session.userid,
        origin
    )
    console.log(ingest)
    res.json({ streamId: id }) */
})

router.post('/relay', async (req, res) => {
    const userId = req.session.userid
    const { ingestId, targets } = req.body
    const relayIds = await relay(ingestId, targets, userId)
    res.json(relayIds)
})

router.post('/task', (req, res) => {
    const task = ingest('asdf')
    res.json(task)
})

router.post('/delete', (req, res) => {
    const deletedFolder = deleteIngestFolder(req.body.id)
    res.json(deletedFolder)
})

router.get('/stop/:id', async (req, res) => {
    const { id } = req.params
    const task = await stop(id)
    res.json('stopped')
})

router.get('/setoffline/:id', async (req, res) => {
    try {
        const { id } = req.params
        const status = false
        const { rows } = await db.setIngest(status, id)
        if (rows.length > 0) {
            res.json({ message: `Streaming ${rows[0].job_id} set as offline` })
        } else {
            res.json({ message: 'Cant update ingest in database' })
        }
    } catch (error) {
        console.log(error)
        res.json(error.severity)
    }
})

router.get('/setoffline/relay/:id', async (req, res) => {
    try {
        const { id } = req.params
        const status = false
        const { rows } = await db.setRelay(status, id)
        if (rows.length > 0) {
            res.json({ message: `Streaming ${rows[0].job_id} set as offline` })
        } else {
            res.json({ message: `Cant update ${id} relay in database` })
        }
    } catch (error) {
        console.log(error)
        res.json(error.severity)
    }
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

router.post('/user/setpw/:id', async (req, res) => {
    const { password } = req.body
    const { id } = req.params
    try {
        const { rows } = await db.getUser(id)
        if (rows[0].password_hash === '1') {
            try {
                const password_hash = await hashPassword(password)
                const result = await db.setUserPw(id, password_hash)
                res.json({
                    success: true,
                    message: 'Password updated successfully.',
                })
            } catch (error) {
                console.log(error)
                res.json(error)
            }
        } else {
            res.json({
                message: 'ERROR. Password for this user has already been set.',
            })
        }
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

router.get('/ingests/active', async (req, res) => {
    const { rows } = await db.getAllActiveIngests()
    res.json(rows)
})

router.get('/ingest/:job_id', async (req, res) => {
    const { job_id } = req.params
    const { rows } = await db.getIngestByJobId(job_id)
    if (rows.length === 1) {
        res.json(rows[0])
    } else {
        res.json({ message: 'Ingest not found' })
    }
})

router.post('/ingest/add', async (req, res) => {
    const { folder, job_id, description, user_id, origin } = req.body
    const result = await db.addIngest(
        folder,
        job_id,
        description,
        user_id,
        origin
    )
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

router.get('/ingestrelays/:id', async (req, res) => {
    const { id } = req.params
    const ingest = await db.getIngestByJobId(id)
    if (ingest.rows.length === 1) {
        const ingestId = ingest.rows[0].id
        const { rows: relays } = await db.getIngestRelays(ingestId)
        console.log(relays)
        res.json(relays.sort((a, b) => b.active - a.active))
    } else {
        res.json([
            {
                server: 'NO SERVER',
                active: false,
                stream_key: '0',
                job_id: '0',
            },
        ])
    }
})

router.post('/relay/add', async (req, res) => {
    const userid = req.session.userid
    const { ingest_id, target_id, description, ingest_jobid } = req.body
    const job_id = relay(ingest_jobid)
    const result = await db.addRelay(
        ingest_id,
        target_id,
        description,
        userid,
        job_id
    )
    res.json({ mesage: 'Relay added' })
})

router.get('/targets', async (req, res) => {
    const { rows } = await db.getTargets()
    res.json(rows)
})

router.get('/targets/active', async (req, res) => {
    const { rows } = await db.getAllActiveTargets()
    res.json(rows)
})

router.get('/targets/org', async (req, res) => {
    const { userid } = req.session
    const { rows } = await db.getUserOrgTargets(userid)
    res.json(rows)
})

router.get('/targets/org/active', authSession, async (req, res) => {
    const { userid } = req.session
    const { rows } = await db.getUserOrgActiveTargets(userid)
    res.json(rows)
})

router.get('/targets/org/available', authSession, async (req, res) => {
    const { userid } = req.session
    const totalTargets = (await db.getUserOrgTargets(userid)).rows
    const activeTargets = (await db.getUserOrgActiveTargets(userid)).rows
    const targetFilter = activeTargets.map((itemY) => {
        return itemY.id
    })
    const availableTargets = totalTargets.filter(
        (itemX) => !targetFilter.includes(itemX.id)
    )
    res.json(availableTargets)
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
    const userid = req.session.userid
    if (!userid) {
        res.json({ message: 'Not logged in' })
    }
    const { server, stream_key, description, public_url, platform } = req.body
    try {
        const result = await db.addTarget(
            server,
            stream_key,
            description,
            public_url,
            platform,
            userid
        )
        console.log(result)
        res.json({ success: true, message: 'Target added' })
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.get('/ingests/org', authSession, async (req, res) => {
    const { userid } = req.session
    const { rows } = await db.getUserOrgIngests(userid)
    res.json(rows)
})

//
// Testing Area -- beware --
//

router.get('/count', (req, res) => {
    const count = Math.floor(Math.random() * 100)
    res.json(count)
})

router.get('/thumbnail/:job_id', async (req, res) => {
    const ytDlpWrap = new YTDlpWrap()
    const { job_id } = req.params
    const { rows } = await db.getIngestByJobId(job_id)
    if (rows.length === 1) {
        const origin = rows[0].origin
        const { url } = await ytDlpWrap.getVideoInfo(origin)
        genThumbnail(
            url,
            `./public/streams/${job_id}/thumbnail.jpeg`,
            '630x354'
        )
            .then(() => res.json({ message: 'Done!' }))
            .catch((err) => console.error(err))
    } else {
        res.json({ message: 'Ingest not found' })
    }
})

router.get('/multiselect', authSession, async (req, res) => {
    const { userid } = req.session
    const totalTargets = (await db.getUserOrgTargets(userid)).rows
    const activeTargets = (await db.getUserOrgActiveTargets(userid)).rows
    const targetFilter = activeTargets.map((itemY) => {
        return itemY.id
    })
    const availableTargets = totalTargets.filter(
        (itemX) => !targetFilter.includes(itemX.id)
    )
    const reformatArray = availableTargets.map((obj) => {
        obj.label = obj.description
        obj.value = obj.id
        return obj
    })

    let groupedOptions = [
        {
            label: 'Twitter',
            options: [],
        },
        { label: 'YouTube', options: [] },
        {
            label: 'Facebook',
            options: [],
        },
        {
            label: 'Twitch',
            options: [],
        },
        {
            label: 'Dailymotion',
            options: [],
        },
        {
            label: 'Custom',
            options: [],
        },
    ]
    reformatArray.forEach((element) => {
        if (element.platform === 'twitter') {
            groupedOptions[0].options.push(element)
        } else if (element.platform === 'youtube') {
            groupedOptions[1].options.push(element)
        } else if (element.platform === 'facebook') {
            groupedOptions[2].options.push(element)
        } else if (element.platform === 'twitch') {
            groupedOptions[3].options.push(element)
        } else if (element.platform === 'dailymotion') {
            groupedOptions[4].options.push(element)
        } else if (element.platform === 'custom') {
            groupedOptions[5].options.push(element)
        }
    })
    res.json(groupedOptions)
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/watermarks')
    },
    filename: function (req, file, cb) {
        const userId = req.session.userid
        const uniqueSuffix = '.png'
        cb(null, userId + uniqueSuffix)
    },
})
const upload = multer({ storage: storage })

router.post('/watermark', upload.single('wm'), (req, res, next) => {
    console.log(req.file)
    res.json({ success: true, message: 'Image uploaded' })
})

router.post('/download', async (req, res) => {
    const url = req.body.url
    const results = await downloadVideo(url)
    const downloadUrl = results.slice(-1)[0]
    if (downloadUrl.includes('ERROR')) {
        res.json({ message: downloadUrl })
    } else {
        res.json({ url: downloadUrl })
    }
})

module.exports = router
