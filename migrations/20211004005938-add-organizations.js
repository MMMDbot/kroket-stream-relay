'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate
    type = dbm.dataType
    seed = seedLink
}

exports.up = function (db) {
    return db.createTable('organizations', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        orgname: { type: 'string', notNull: true },
        address: 'string',
        phone: 'string',
        created_at: {
            type: 'timestamp',
            notNull: 'true',
            defaultValue: new String('now()'),
        },
    })
}

exports.down = function (db) {
    db.dropTable('organizations')
}

exports._meta = {
    version: 1,
}
