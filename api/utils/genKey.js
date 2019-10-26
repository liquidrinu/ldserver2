require('crypto').randomBytes(48, (err, buffer) => {
  console.log(buffer.toString('base64'));
});
