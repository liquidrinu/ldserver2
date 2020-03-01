// Dependencies
const Promise = require("bluebird");
const bcrypt = require("bcryptjs");

// DAO
const AppDAO = require("../dao");
const dao = new AppDAO();

// Models
const UserModel = require("../models/user.model");
const User = new UserModel(dao);

///////////////////////////////////////
module.exports = {
  createTable: () => {
    return User.createTable();
  },

  getById: id => {
    return new Promise((resolve, reject) => {
      resolve(User.getById());
      reject("Error fetching user by id!");
    });
  },

  getByUserName: username => {
    return new Promise((resolve, reject) => {
      resolve(User.getByUsername(username));
      reject("Error finding user");
    });
  },

  getSalt: username => {
    return User.getSalt(username);
  },

  register: data => {
    return new Promise((resolve, reject) => {
      resolve(User.insertUser(data));
      reject("error");
    });
  },

  verifyPassword: (username, password) => {
    return new Promise((resolve, reject) => {
      User.getByUsername(username).then(user => {
        User.getHash(username).then(hash => {
          bcrypt.compare(password, hash[0].password, (err, res) => {
            if (err || !res) reject("Wrong user or password");
            resolve(username);
          });
        });
      });
    }).catch(err => console.log("Unauthorized user"));
  },

  generatePassword: password => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt((saltRounds = 12), (err, salt) => {
        if (err) return err;
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return err;
          resolve(hash);
          reject(err);
        });
      });
    });
  },

};
