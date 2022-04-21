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
    return db.createTable('users', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        username: { type: 'string', notNull: true },
        password_hash: { type: 'string', notNull: true },
        email: { type: 'string', notNull: true },
        full_name: 'string',
        organization_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'users_organization_id_fk',
                table: 'organizations',
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
    db.dropTable('users')
}

exports._meta = {
    version: 1,
}
