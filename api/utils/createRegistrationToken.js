// Register account from shell
const path = require("path");
const args = process.argv.slice(2);
const crypto = require('crypto');

// the selected method
const method = args[0];

// Controllers
const Token = require('../controllers/token.controller');

// generate token
method === "generate"
    ? (() => {
        const key = crypto.randomBytes(64).toString('base64');
        Token.storeToken("utils", key, "REGISTRATION");
        console.log("Generated token: ", key);
    })()
    : console.log('invalid method');
