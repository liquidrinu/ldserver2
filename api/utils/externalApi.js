// Dependencies
const Promise = require('./bluebird');
const rp = require('./request-promise');

function getFromApi () {
  return new Promise((resolve, reject) => {
    // Prepare Request Objects
    const login = {
      method: 'POST',
      uri: '',
      body: {
        username: process.env.API_USERNAME || "",
        password: process.env.API_PASSWORD || "",
      },
      json: true,
    };

    const myRequest = {
      uri: '',
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // Execute
    rp(login)
      .then(data => {
        // set validation token from previous response
        myRequest.headers['X-LDSERVER2-Validation'] = data.validation_token;

        rp(myRequest).then(data => {
          resolve(data);
          reject();
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}

getFromApi().then(response => {
  //..
});


