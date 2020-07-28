var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var path = require('path');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('beep', function(){
        socket.emit("speed", {data: 5});
        console.log('beep recieved');
    });

    socket.on('change-speed', function(data) {
        console.log('change speed recieved: ' + data);
        socket.emit("speed", {newSpeed: data});
    });

    socket.on('ios-connection', function(data) {
        console.log('ios connection with message: ' + data);
    });

});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});