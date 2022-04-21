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
    return db.createTable('relays', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        description: { type: 'string' },
        active: { type: 'boolean' },
        user_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'relay_user_id_fk',
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
                name: 'relay_organization_id_fk',
                table: 'organizations',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT',
                },
                mapping: 'id',
            },
        },
        target_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'relay_target_id_fk',
                table: 'targets',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT',
                },
                mapping: 'id',
            },
        },
        ingest_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'relay_ingest_id_fk',
                table: 'ingests',
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
    db.dropTable('relays')
}

exports._meta = {
    version: 1,
}
