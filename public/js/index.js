var socket = io();

socket.on('connect', function () {
  console.log('connected to server!');
});

socket.on('disconnect', function () {
  console.log('disconnected from server!');
});

socket.on('newMessage', function (message) {
  // console.log('New message: ', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}-->${message.text}  at ${message.createdAt}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'client1',
//   text: 'hii from an old client :)'
// },function (serverMessage) {
//   console.log('Acknowledged!',serverMessage);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: jQuery('[name=From]').val(),
    text: jQuery('[name=Message]').val()
  },function (serverMessage) {
    console.log('Acknowledged!',serverMessage);
  });

});
