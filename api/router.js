/**
 * [Router]
 *
 * @summary
 * Main hub/entry for managing all incoming requests
 *
 * @description
 * Place a reference as parent route to a new router file,
 * that contains all the specific endpoints
 *
 * place `auth` as 2nd argument in a route to restrict access
 *
 * @author liquidrinu
 */

// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const endpoints = require('express-list-endpoints');
const ldswiss = require('../ldswiss'); // @liquidrinu
const jwtAuth = require('./controllers/jwt.controller');
const rate = require('./utils/rate-limit');

/*** BEGIN ROUTES *******************************************************/

/**
 * [router]
 *
 * @requires _index.js
 * @route [/]
 * This route leads to another `router` that
 * contains all the main API routing
 */

router.use('/', require('./routes/__index.js'));


/**
 * @route [/auth]
 * Routes for handling auth through passport.js
 */

router.use('/account', require('./routes/user.routes.js'));

/**
 * @route [/authorized]
 * An endpoint to check if your logged in
 */

router.get('/authorized', rate.limit(1, 50), (req, res, next) => {
  if (req.user) res.send({ authorized: true });
  else res.send({ authorized: false });
});

/**
 * @route /endpoints
 * View all routes passing through router.js
 */

router.get('/endpoints', auth, (req, res) => {
  let data = new Promise((resolve, reject) => {
    resolve(endpoints(router));
    reject("Can't retrieve endpoints");
  });
  data.then(data => res.json(data));
});

/**
 * @route testRoutes
 * Various routes for testing server functionality
 */

router.use('/test',
  rate.limit(1, 200),
  auth,
  require('./routes/test.routes.js'));

/**
 * @module Vue-Client
/*
const history = require('connect-history-api-fallback');
router.use(history());
router.use(express.static(path.join(__dirname, '../vue-client/dist')));*/

/*** END ROUTES *********************************************************/

/*** Helpers ***/
/**
 * @method auth
 * Put this as middleware in a route to restrict access to registered users
 */

function auth (req, res, next) {
  if (req.user) return next();
  res.redirect(401, '/');
}

/**
 * @middleware checkApiKey
 *
 * @summary either allows you access...
 *
 * ..or not
 */

function checkApiKey (req, res, next) {
  if (req.headers.authorization === process.env.API_KEY || req.user)
    return next();
  res.redirect(401, '/');
}

// 404
router.use((req, res, next) => {
  return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

// 500 - Any server error
router.use((err, req, res, next) => {
  return res.status(500).send({ error: err });
});

/** Under Construction */
/**
 * @route  /.. , /login
 * JSON web tokens
 */
//let handlers = new jwtAuth();
//router.post("/login", handlers.login);
//router.get("/", handlers.checkToken, (req, res) => {
//  res.send("succes!");
//});

////////////////////////
module.exports = router;
