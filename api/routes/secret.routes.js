// Dependencies
const express = require("express");
const router = express.Router();

/**
 * @routes - secret routes
 * @summary - all routes here are closed off to public
 */

// Wrapper with path *oneliner
let _PATH = filePath => { return (require("path")).join(__dirname, filePath); };

router.get('/', (req, res) => {
    res.status(200).send(`
    You are logged in as: <p style="color: green;">${req.user}</p>
    <p>These routes can be seen now!</p>
    `);
});

module.exports = router;