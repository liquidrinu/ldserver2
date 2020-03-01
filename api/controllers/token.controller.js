// Dependencies
const Promise = require("bluebird");
const moment = require("moment");

// DAO
const AppDAO = require("../dao");
const dao = new AppDAO();

// Models
const TokenModel = require("../models/token.model");
const Token = new TokenModel(dao);

///////////////////////////////////////
module.exports = {
  createTable: () => {
    return Token.createTable();
  },

  getByUsername: username => {
    return Token.getByUsername(username);
  },

  getToken: token => {
    return Token.getByToken(token);
  },

  deleteToken: token => {
    return Token.deleteByUsername(token);
  },

  storeToken: (user, token, type) => {
    let _TOKEN = {
      insertion_date: moment().unix(),
      user_id: 0,
      username: user,
      token: token,
      type: type || "GENERAL"
    };
    Token.insertToken(_TOKEN);
  },

  createRegistrationToken: (_USERNAME, _TOKEN) => {
    Token.createTable()
      .then(() => {
        let data = {
          user_id: -1000, // yes yes very ugly deal with it or fix it
          username: _USERNAME || "admin",
          insertion_date: moment().unix(),
          token: _TOKEN || process.env.REGISTRATION_KEY,
          type: "REGISTRATION"
        };
        return data;
      })
      .then(data => Token.insertToken(data));
  },

  getRegistrationToken: token => {
    return Token.exists(token);
  }
};
