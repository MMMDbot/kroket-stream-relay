const express = require('express')
const router = express.Router()
const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis')
const { generateError } = require('../services/errors')
const users = require('../services/user')
require('dotenv').config()

const RedisStore = connectRedis(session)

//Configure redis client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err)
})
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully')
})

router.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.JWTSECRET,
        saveUninitialized: true,
        resave: false,
        rolling: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 10,
        },
    })
)

router.get('/', (req, res) => {
    res.send(generateError('auth-session'))
})

router.get('/check-session', (req, res) => {
    if (req.session.username) {
        res.send({
            loggedIn: true,
            username: req.session.username,
            userid: req.session.userid,
            orgid: req.session.orgid,
        })
    } else {
        res.send({ loggedIn: false })
    }
})

router.post('/login', async (req, res) => {
    const sess = req.session
    const { username, password } = req.body

    try {
        const log = await users.loginUser(username, password)
        const user = await users.getUserbyUsername(username)
        if (log) {
            sess.username = username
            sess.userid = user.id
            sess.orgid = user.organization_id
            sess.cookie.maxAge = 365 * 24 * 60 * 60 * 1000
            res.send(sess)
        } else {
            res.json({ message: 'Incorrect user or password' })
        }
    } catch (err) {
        console.error(err)
    }
})
module.exports = router
