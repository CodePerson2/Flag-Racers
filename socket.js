var sock = require('express')();
var http = require('http').Server(sock);
const PORT = process.env.PORT || 3000
var io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log('A user connected');
 
    //Whenever someone disconnects
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

http.listen(PORT, function() {
   console.log('listening on *:3000');
});