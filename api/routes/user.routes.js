// Dependencies
const express = require('express');
const moment = require('moment');
const Promise = require('bluebird');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');

const router = express.Router();

// Controllers
const User = require('../controllers/user.controller');
const Token = require('../controllers/token.controller');

//////////////////////////////////////
/* Static dir */
let _PATH = filePath => {
  return require("path").join(__dirname, filePath);
};
router.use(express.static(_PATH("../views")));

/**
 * @route `/`
 * @method index.html
 */

router.get('/', (req, res) => {
  res.sendFile(_PATH('../views/index.html'));
});

/**
 * @route `/login`
 * @method jwt.sign - create & manage json web token
 */

router.get('/login', (req, res) => {
  res.sendFile(_PATH('../views/login.html'));
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  login(req, res);
});

function login (req, res) {
  let token = jwt.sign({ username: req.username }, config.jwt.secret, {
    expiresIn: '12h',
  });

  // container for token
  let TOKEN = '';

  // insert token into database
  Token.getByUsername(req.username).then(_userToken => {
    // check if token expired
    if (exists(_userToken)) {
      let prev = new Date(_userToken[0].insertion_date * 1000);
      let now = Date.now();
      let diffHours = Math.floor((now - prev) / 3600 / 1000);
      let expireAt = 24; // `hours`

      // token older than `expireAt` ..
      if (diffHours > expireAt) {
        // .. if so update token
        Token.deleteToken(req.username).then(() => {
          Token.storeToken(req.username, token);
          TOKEN = token;
        });
      } else {
        // keep token
        TOKEN = _userToken[0].token;
      }
    } else {
      // store new token if none is present
      Token.storeToken(req.username, token);
      TOKEN = token;
    }

    if (req.body.api === 'true') {
      res.status(200).json({
        username: req.username,
        success: true,
        message: 'Authentication successful!',
        token: TOKEN || '',
      });
    } else {
      res.redirect(302, '/');
    }
  });
}

/**
 * @route `/register`
 * @method getByUserName    - check if username exists
 * @method generatePassword - hash supplied password
 */

router.get('/register', (req, res) => {
  res.sendFile(_PATH('../views/register.html'));
});

router.post('/register', allowRegister, (req, res) => {

  let username = req.body.username.toLowerCase().replace(/^\s+|\s+$/gm, ''); // force lower-case and remove whitespace
  let password = req.body.password;

  User.getByUserName(username).then(() => {
    User.generatePassword(password).then(password => {
      User.register({ username, password })
        .then(id => {
          redirect('/');
          //res.status(200).json(id);
        })
        .catch(err => {
          res.status(400).send('Registration failed!');
        });
    });
  });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

// Passport.js
passport.use(
  new LocalStrategy((username, password, done) => {
    // auth-by-token
    Token.getByUsername(username)
      .then(token => {
        if (exists(token)) {
          if (token[0].token === password) {
            return done(null, username);
          }
        }
      })
      .catch(err => { });

    User.getByUserName(username)
      // Auth Local
      .then(localUser => {
        if (exists(localUser)) {
          User.verifyPassword(username, password)
            .then(username => {
              return done(null, username);
            })
            .catch(err => {
              return done(null, false);
            });
        }
      })
      .catch(err => console.log(err));
  })
);

module.exports = router;
////////////////////////////////////


/**
 * @route `/register`
 * @method allowRegister    - allow registration
 */

function allowRegister (req, res, next) {
  // check blacklisted usernames
  const blackListed = require('../../config/blacklistRegistration').blacklist.includes(req.body.username.toLowerCase());

  if (!blackListed) {
    Token.getToken(req.body.token).then(exists => {
      if (exists.length > 0) {
        next();
      } else {
        res.send('Registration not allowed');
      }
    });
  } else {
    res.send('Invalid username');
  }
}

/**
 * @method exists    - check for sql entry existance
 */

function exists (data) {
  if (!Array.isArray(data) || !data.length) {
    return false;
  } else {
    return true;
  }
}
