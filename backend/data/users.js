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
    addUser: (username, password_hash, email, full_name, organization_id) =>
        pool.query(
            'INSERT INTO users (username, password_hash, email, full_name, organization_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, password_hash, email, full_name, organization_id]
        ),
    getOrganizations: () =>
        pool.query('SELECT * FROM organizations ORDER BY id ASC'),
    getOrganization: (id) =>
        pool.query('SELECT * FROM organizations WHERE id = $1', [id]),
    addOrganization: (orgname, address, phone) =>
        pool.query(
            'INSERT INTO organizations (orgname, address, phone) VALUES ($1, $2, $3)',
            [orgname, address, phone]
        ),
    getIngests: () => pool.query('SELECT * FROM ingests ORDER BY id ASC'),
    getIngest: (id) => pool.query('SELECT * FROM ingests WHERE id = $1', [id]),
    addIngest: (folder, job_id, description, user_id) =>
        pool.query(
            'INSERT INTO ingests (folder, job_id, description, user_id) VALUES ($1, $2, $3, $4)',
            [folder, job_id, description, user_id]
        ),
    getRelays: () => pool.query('SELECT * FROM relays ORDER BY id ASC'),
    getRelay: (id) => pool.query('SELECT * FROM relay WHERE id = $1', [id]),
    addRelay: (ingest_id, target_id, description, user_id, job_id) =>
        pool.query(
            'INSERT INTO relays (ingest_id, target_id, description, user_id, job_id) VALUES ($1, $2, $3, $4, $5)',
            [ingest_id, target_id, description, user_id, job_id]
        ),
    getTargets: () => pool.query('SELECT * FROM targets ORDER BY id ASC'),
    getTarget: (id) => pool.query('SELECT * FROM relay WHERE id = $1', [id]),
    addTarget: (
        server,
        stream_key,
        description,
        public_url,
        platform,
        user_id
    ) =>
        pool.query(
            'INSERT INTO targets (server, stream_key, description, public_url, platform, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [server, stream_key, description, public_url, platform, user_id]
        ),
    checkUsername: (username) =>
        pool.query('SELECT * FROM users WHERE username = $1', [username]),
}
