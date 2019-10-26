// Base routes
const express = require("express");
const router = express.Router();

// Wrapper with path *oneliner
let _PATH = filePath => { return (require("path")).join(__dirname, filePath);};

// *serve static assets directory wide*
router.use(express.static(_PATH("../../public")));

// When this is set, routing into this file will automatically
// try to serve index.html and do so if it's available

module.exports = router;