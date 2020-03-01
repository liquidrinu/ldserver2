// Register account from shell
const users = require("../controllers/user.controller.js");
const path = require("path");
const args = process.argv.slice(2);

const username = args[0];
const password = args[1];
const type = args[2] || "USER";

// Wrapper with `path`
let _PATH = filePath => {
  return path.join(__dirname, filePath);
};

(() => {
  Promise.all([username, password, type])
    .then(args => {
      let data = {
        username: args[0],
        password: args[1],
        alias: args[0],
        type: args[2]
      };
      return data;
    })
    .then(data => {
      // create account and place in database
      users.getByUserName(data.username).then(() => {
        users.generatePassword(data.password).then(hash => {
          users
            .register({
              username: data.username,
              password: hash,
              alias: data.username,
              type: data.type
            })
            .then(id => {
              console.log(`Registration succesfull!`);
              return;
            })
            .then(() => {
              process.exit();
            })
            .catch(err => {
              console.log("Registration failed!");
            });
        });
      });
    });
})();
