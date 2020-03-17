//const _CONFIG = require("./config/config.js");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname + "/.env")
});

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  },

  testing: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  }
};
