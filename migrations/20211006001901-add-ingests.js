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
    return db.createTable('ingests', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        folder: { type: 'string', notNull: true },
        job_id: { type: 'string', notNull: true, unique: true },
        description: { type: 'string' },
        active: 'boolean',
        user_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'ingests_user_id_fk',
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
                name: 'ingests_organization_id_fk',
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
        stopped_at: {
            type: 'timestamp',
        },
    })
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1,
}
