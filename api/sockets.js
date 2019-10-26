exports = module.exports = function(io) {
  // client control messages
  io.on('connection', socket => {
    socket.on('test', msg => {
      console.log(msg);
      socket.emit(
        'server',
        `<b style="color: red;">[ server ]</b><b> If you wrote.. </b>
                 <p style="padding: 4px 12px; ; color: black;">${msg}</p>
                 <b> .. then the socket connection is <b style="color: green;"> [ OK ]</b>`
      );
    });
  });

  // uncomment below to check connections
  io.on('connection', socket => {
    console.log(`
        incoming package from: ${socket.conn.request.headers.referer}
        encryption: ${socket.conn.request.socket.encrypted}
        `);
    socket.on('disconnect', () => {
      console.log(' user disconnected..');
    });
  });
};
