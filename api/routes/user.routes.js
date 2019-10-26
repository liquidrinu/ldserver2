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
  let token = jwt.sign({ user: req.user }, config.jwt.secret, {
    expiresIn: '2h',
  });

  res.redirect('/');

  //if (req.body.redirect !== 'true') {
  //  res.status(200).json({
  //    success: true,
  //    message: 'Authentication successful!',
  //    token: token,
  //  });
  //} else {
  //  res.redirect(302, '/');
  //}
});

/**
 * @route `/register`
 *
 * @method getByUserName    - check if username exists
 * @method generatePassword - hash supplied password
 */

router.get('/register', (req, res) => {
  res.sendFile(_PATH('../views/register.html'));
});

router.post('/register', allowRegister, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  console.log(req.body);

  User.getByUserName(username).then(() => {
    User.generatePassword(password).then(password => {
      User.register({ username, password })
        .then(id => {
          res.status(200).json(id);
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
    User.verifyPassword(username, password)
      .then(loggedIn => {
        return done(null, loggedIn);
      })
      .catch(err => {
        return done(null, false);
      });
  })
);

module.exports = router;
////////////////////////////////////

function allowRegister (req, res, next) {
  Token.getRegistrationToken(process.env.REGISTRATION_KEY).then(exists => {
    if (exists) {
      next();
    } else {
      res.send('Registration not allowed');
    }
  });
}


