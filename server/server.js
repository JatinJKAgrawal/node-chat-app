const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

const {generateMessage} = require('./utils/message');

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected!');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatApp.'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('disconnect', () => {
    console.log('client disconnected!');
  });

  socket.on('createMessage', function (message) {
    console.log('createMessage: ', message);



    io.emit('newMessage', generateMessage(message.from, message.text));

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });


})

server.listen(port, () => {
  console.log(`server up on port ${port}`);
})
