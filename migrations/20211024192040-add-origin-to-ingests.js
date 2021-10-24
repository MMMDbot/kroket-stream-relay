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
    return db.addColumn('ingests', 'origin', {
        type: 'string',
        notNull: true,
        defaultValue: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    })
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1,
}
