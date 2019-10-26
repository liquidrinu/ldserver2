// Dependencies
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

// controllers
const users = require('../controllers/user.controller');
const tokens = require('../controllers/token.controller');

// Wrapper with `path`
let _PATH = filePath => {
  return path.join(__dirname, filePath);
};

/**
 * @routes - test routes
 */

router.get('/', (req, res) => {
  res.sendFile(_PATH('../tests/index.html'));
});

router.get('/sockets', (req, res) => {
  res.sendFile(_PATH('../tests/socket-test.html'));
});

// check file access
router.get('/file/klanten', (req, res) => {
  fs.readFile(_PATH('../tests/test-klanten.json'), (err, data) => {
    if (err) throw err;
    let response = JSON.parse(data);
    res.json(response);
  });
});

module.exports = router;
