const express = require('express')()
const path = require('path')
const PORT = process.env.PORT || 5000


//socket.io
var http = require('http').createServer(express);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('A user connected');

  //Send a message after a timeout of 4seconds
  setTimeout(function() {
     socket.send('Sent a message 4seconds after connection!');
  }, 1000);

  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});


http.listen(PORT,function(){
  console.log("Listening to port " + PORT);
});