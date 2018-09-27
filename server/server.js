const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.on('disconnect', () => {
    console.log('client disconnected!');
  });

  socket.on('createMessage', function (message) {
    console.log('createMessage: ', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

})

server.listen(3000, () => {
  console.log(`server up on port 3000`);
})
