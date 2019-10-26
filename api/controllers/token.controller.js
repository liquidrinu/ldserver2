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

  createRegistrationToken: () => {
    Token.createTable().then(() => {
      const data = {
        insertion_date: moment().unix(),
        token: "1234856",
        type: "REGISTRATION"
      };
      console.log(data);
      return Token.insertToken(data);
    });
  },

  getRegistrationToken: token => {
    return Token.exists(token);
  }
};
