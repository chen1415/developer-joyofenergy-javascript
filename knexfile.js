// Update with your config settings.
// yarn knex migrate:make create_users_table
// yarn knex migrate:latest

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "power",
      charset: "utf8",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
