const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kroket',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
})

module.exports = {
    getUsers: () => pool.query('SELECT * FROM users ORDER BY id ASC'),
    getUser: (id) => pool.query('SELECT * FROM users WHERE id = $1', [id]),
    getOrganizations: () =>
        pool.query('SELECT * FROM organizations ORDER BY id ASC'),
    getOrganization: (id) =>
        pool.query('SELECT * FROM organizations WHERE id = $1', [id]),
    addOrganization: (orgname, address, phone) =>
        pool.query(
            'INSERT INTO organizations (orgname, address, phone) VALUES ($1, $2, $3)',
            [orgname, address, phone]
        ),
    addUser: (username, password_hash, email, full_name, organization_id) =>
        pool.query(
            'INSERT INTO users (username, password_hash, email, full_name, organization_id) VALUES ($1, $2, $3, $4, $5)',
            [username, password_hash, email, full_name, organization_id]
        ),
    getIngests: () => pool.query('SELECT * FROM ingests ORDER BY id ASC'),
    getRelays: () => pool.query('SELECT * FROM relays ORDER BY id ASC'),
    getTargets: () => pool.query('SELECT * FROM targets ORDER BY id ASC'),
}
