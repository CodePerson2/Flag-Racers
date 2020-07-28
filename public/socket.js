var socket = io.connect('/');
socket.on('message', function(data){document.write(data)});