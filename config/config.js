module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  },
  passport: {
    username: '',
    password: '',
  },
  cookieparser: {
    secret: process.env.COOKIEPARSER_SECRET,
  },
  redis: {
    secret: process.env.REDIS_SECRET,
    host: '127.0.0.1',
    port: 6379,
    resave: false,
    saveUninitialized: false,
  },
};
