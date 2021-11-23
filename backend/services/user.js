const db = require('../data/users')
const bcrypt = require('bcrypt')
const jwtGenerator = require('./jwtGenerator')
const { generateError } = require('../services/errors')
require('dotenv').config()

/**
 * Register a new user
 * @param  {String} username
 * @param  {String} password
 * @param  {String} email
 * @param  {String} full_name
 * @param  {Integer} organization_id
 */
async function registerUser(
    username,
    password,
    email,
    full_name,
    organization_id
) {
    try {
        const user = await db.checkUsername(username)
        if (user.rows.length > 0) {
            return generateError(500)
        }
        //
        // We should add email string validation here
        //
        // We should add email DB validation here
        //
        const salt = await bcrypt.genSalt(10)
        const password_hash = await bcrypt.hash(password, salt)

        const newUser = await db.addUser(
            username,
            password_hash,
            email,
            full_name,
            organization_id
        )
        console.log(newUser.rows[0])
        const jwtToken = jwtGenerator(newUser.rows[0].id)
        return jwtToken
    } catch (error) {
        return generateError(500)
    }
}

async function loginUser(username, password) {
    try {
        const user = await db.getUserByUsername(username)
        const match = await bcrypt.compare(password, user.rows[0].password_hash)
        return match
    } catch (error) {
        return console.error(error)
    }
}

async function getUserbyUsername(username) {
    try {
        const { rows } = await db.getUserByUsername(username)
        if (rows.length > 0) {
            return rows[0]
        } else {
            return { message: 'User not found' }
        }
    } catch (error) {
        return console.error(error)
    }
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt)

    return password_hash
}

module.exports = { registerUser, loginUser, getUserbyUsername, hashPassword }
