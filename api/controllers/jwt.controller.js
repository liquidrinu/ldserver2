// Dependencies
const jwt = require('jsonwebtoken');
const moment = require('moment');

// Models
const tokenModel = require('../models/token.model');
const token = new tokenModel();

class JwtAuth {
  checkToken (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid',
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied',
      });
    }
  }

  // ** UNDER CONSTRUCTION **
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({ username: username }, config.jwt.secret, {
          expiresIn: '2h',
        });
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token,
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password',
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request',
      });
    }
  }

  index (req, res) {
    res.json({
      success: true,
      message: 'Index page',
    });
  }
}

module.exports = JwtAuth;
