/************************************************
 *            [ W E B S E R V E R ]              *
 *            [ author:liquidrinu ]              *
 ************************************************/

//  [ CONFIG ]
const path = require('path');
const log = require('./config/log.js');
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname + '/.env'),
});

const http = require('http');
const https = require('https');
const fs = require('fs');

//  [ HOST, PORT ]
const HOST = 'localhost';
const PORT = process.env.PORT || 443;

//  [ EXPRESS ]
const express = require('express');
const app = express();

//  [ AUTH ]
const certs = {
  key: fs.readFileSync(process.env.SSL_KEY, 'utf-8'),
  cert: fs.readFileSync(process.env.SSL_CERT, 'utf-8'),
  ca: fs.readFileSync(process.env.SSL_CA, 'utf-8'),
};

//  [ CORE ]
const core = require('./api/core.js');
app.use('/', core);

//  [ ROUTER ]
const router = require('./api/router.js');
app.use('/', router);

//  [ HTTPS ]
const server = https.createServer(certs, app);

//  [ WEBSOCKETS ] **under construction**
//const io = require("socket.io")(server);
//const sockets = require("./api/sockets.js")(io);

// [ OPEN ]
server.listen(PORT, () => log(HOST, PORT));
