const express = require('express')
const cors = require('cors')
const router = express.Router()
const validator = require('../middlewares/validator')
const { generateError } = require('../services/errors')
const { registerUser } = require('../services/user')

router.get('/', (req, res) => {
    res.send(generateError(401))
})

router.post('/register', validator, async (req, res) => {
    const { username, password, email, full_name, organization_id } = req.body
    const user = await registerUser(
        username,
        password,
        email,
        full_name,
        organization_id
    )
    res.json(user)
})
module.exports = router
