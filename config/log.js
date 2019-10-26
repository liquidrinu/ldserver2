const ld = require("../ldswiss.js");
const os = require('os');

module.exports = function (host, port) {
  // get ip info
  let ip = require("ip");
  let _host = ip.address();

  // unix script [./.bin/tree.sh] ##
  let promise = new Promise((resolve, reject) => {
    let exec = require("child_process").exec;
    let tree = exec("sh ../bin/tree.sh", (error, stdout, stderr) => {
      let treeData = `\n [ Application Tree ] \n ${stdout} \n ${stderr}`;
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
      resolve(treeData);
      reject("rejected");
    });
  });

  //promise finished, exectue log function
  promise.then(treeData => {
    //grab package.json
    let head = require("../package.json");

    // es6 template literals for output on startup
    let serverInfoHeader = "[   Server Info   ]";
    let serverOutput = `
      NAME : ${head.name}
      HOST : ${_host}
      PORT : ${port}`;

    let generalOutput = `
      Version     : ${head.version}
      Authors     : ${head.author}
      License     : ${head.license}
      Description : ${head.description}
      `;

    let packageList = `[   Dependencies   ] \n \n`;
    for (let key in head.dependencies) {
      if (head.dependencies.hasOwnProperty(key)) {
        let str = `${key}: ${head.dependencies[key]} \n`;
        packageList += ld.strPad(str, 6);
      }
    }

    // FORMATTED OUTPUT
    console.log(`
        ${treeData}
        ${serverInfoHeader}
        ${serverOutput}
        ${generalOutput}
        ${packageList}
        `);
  });

};
