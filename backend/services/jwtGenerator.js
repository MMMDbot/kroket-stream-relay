const jwt = require('jsonwebtoken')
require('dotenv').config()

function jwtGenerator(uid) {
    const payload = {
        user: {
            id: uid,
        },
    }
    return jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: '1h',
    })
}
module.exports = jwtGenerator
