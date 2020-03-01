

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET
  },
  session: {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    //cookie: {
    //  maxAge: 24 * 60 * 60 * 1000
    //}
  },
  passport: {
    username: "",
    password: ""
  },
  cookieparser: {
    secret: process.env.COOKIEPARSER_SECRET
  },
  redis: {
    secret: process.env.REDIS_SECRET,
    host: "127.0.0.1",
    port: 6379,
    resave: false,
    saveUninitialized: false
  },
  knex: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLE
    }
  }
};
