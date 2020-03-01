/*
    CORE PACKAGES
*/

// config file *private
const _CONFIG = require('../config/config.js');

// dependencies
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');

// framework
const app = express();

// helmet
//app.use(helmet());
//app.use(
//  helmet.hsts({
//    maxAge: 5184000
//  })
//);

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* **Linux only & requires a configured running redis instance**
// redis
app.use(
    session({
        store: new RedisStore({
            host: _CONFIG.redis.host,
            port: _CONFIG.redis.port
        }),
        secret: _CONFIG.redis.secret,
        resave: _CONFIG.redis.resave,
        saveUninitialized: _CONFIG.redis.saveUninitialized
    })
);*/

// passport.js
app.use(session(_CONFIG.session));
app.use(
  passport.initialize({
    userProperty: "username" // defaults to 'user' if omitted
  })
);
app.use(passport.session());

passport.serializeUser((username, done) => {
  done(null, username);
});

passport.deserializeUser((username, done) => {
  done(null, username);
});


///////////////////////////////////////////////////////////////////////////////////

module.exports = app;
