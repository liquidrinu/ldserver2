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
const Token = require('../controllers/token.controller');

//////////////////////////////////////
/* Static dir */
let _PATH = filePath => {
    return require("path").join(__dirname, filePath);
};
