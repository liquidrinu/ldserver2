// Register account from shell
const users = require("../controllers/user.controller.js");
const path = require("path");
const args = process.argv.slice(2);

const username = args[0];
const password = args[1];
const type = args[2] || "CLI_CREATED";

// Wrapper with `path`
let _PATH = filePath => {
  return path.join(__dirname, filePath);
};

(() => {
  Promise.all([username, password])
    .then(args => {
      let data = {
        username: args[0],
        password: args[1],
        alias: args[0]
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
              alias: data.username
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
