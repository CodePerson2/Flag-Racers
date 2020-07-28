var socket = io.connect('/');
socket.on('num', function(data){document.write(data)});
