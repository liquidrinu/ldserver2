const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = 80;

// Redirect http to https!

// [ OPEN ]
server.listen(PORT);

app.all("*", (req, res) => {
  res.redirect("https://" + req.headers.host + req.url);
});
