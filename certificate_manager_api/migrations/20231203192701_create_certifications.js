/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('certifications', function (table) {
        table.increments('id').primary();
        table.string('certificate_id', 10).notNullable().unique();
        table.string('name', 100).notNullable();
        table.string('description', 255).nullable();
        table.string('email', 100).notNullable();
        table.string('issuer', 100).notNullable();
        table.date('expire_date').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        // table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('certifications');
};
