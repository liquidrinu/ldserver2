// Dependencies
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

// populate database for testing/init purposes
const users = require('./api/controllers/user.controller');
const tokens = require('./api/controllers/token.controller');

// Wrapper with `path`
let _PATH = filePath => {
  return path.join(__dirname, filePath);
};

(() => {
  Promise.all([
    users.createTable(),
    tokens.createRegistrationToken(),
  ])
    .then(values => {
      let response = {};
      response.users = values[0];
      response.tokens = values[1];
      return response;
    })
    .then(response => console.log(response));
})();
