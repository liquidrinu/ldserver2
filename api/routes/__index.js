// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

/***
 * `[ Api Routes]`
 *
 * This file is the index for all the various routes
 * That are accesible on this server:port
 */
/**
 * @method auth
 * Put this as middleware in a route to restrict access to registered users
 */

function auth (req, res, next) {
    if (req.user) return next();
    res.redirect('/account/login');
}

/*** BEGIN ROUTES *******************************************************/

/**
 * @route [index]
 * @summary - this route serves the main (public) homepage
 */

router.use('/', require('./public.routes.js'));

/**
 * @route [/secret]
 * @summary - example of a private route
 *
 * All routes belonging after `/secret` will
 * now not be accesible without logging in
 */

router.use('/secret', auth, require('./secret.routes.js'));

// ie.
// router.use('/my-url', middleware(optional), require('/my-routes-file.js'));
// ..
// etc.

/*** END ROUTES *********************************************************/
module.exports = router;
