/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .createTable('users', function (table) {
      table.string('smartMeterId').primary();
      table.string('name').notNullable();
      table.string('powerSupplier').notNullable();
    })
    .createTable('readings', function (table) {
      table.increments('id').primary();
      table.string('smartMeterId').references('smartMeterId').inTable('users');
      table.bigint('time').notNullable();
      table.float('reading').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('readings')
    .dropTable('users');
};
