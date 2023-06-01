// Update with your config settings.
//  npx knex migrate

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
