//grab local ip

module.exports = exports = function() {
  var sys = require("util");
  var exec = require("child_process").exec;

  var tree = exec("sh ./bin/local_ip.sh", (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
};
