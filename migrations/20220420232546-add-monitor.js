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
    return db.createTable('monitor', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string' },
        url: { type: 'string' },
        source: { type: 'string' },
        user_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'monitor_user_id_fk',
                table: 'users',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT',
                },
                mapping: 'id',
            },
        },
        created_at: {
            type: 'timestamp',
            notNull: 'true',
            defaultValue: new String('now()'),
        },
    })
}

exports.down = function (db) {
    db.dropTable('monitor')
}

exports._meta = {
    version: 1,
}
