import type { Knex } from "knex";
import { env } from "./env";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  local: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
  },

  development: {
    client: "postgresql",
    connection: {
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
