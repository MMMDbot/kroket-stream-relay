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
    return db.createTable('targets', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        server: { type: 'string', notNull: true },
        stream_key: { type: 'string', notNull: true },
        description: { type: 'string' },
        public_url: { type: 'string' },
        platform: { type: 'string' },
        user_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'targets_user_id_fk',
                table: 'users',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT',
                },
                mapping: 'id',
            },
        },
        organization_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'targets_organization_id_fk',
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
    db.dropTable('targets')
}

exports._meta = {
    version: 1,
}
