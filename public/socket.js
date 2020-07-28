var socket = io.connect('/');
socket.on('speed', function (data) {
    console.log('speed Message Received!');
    console.log(data);    
});

socket.on('beep', function (data) {
    console.log('beep Message Received!');    
    console.log(data);    
});
socket.emit("beep", {beep : true});
socket.emit("change-speed", {"change-speed" : true});
socket.emit("ios-connection", {"ios-connection" : true});