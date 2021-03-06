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
    return db.addColumn('users', 'role_id', {
        type: 'int',
        notNull: true,
        foreignKey: {
            name: 'users_role_id_fk',
            table: 'roles',
            rules: {
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT',
            },
            mapping: 'id',
        },
        defaultValue: 3,
    })
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1,
}
