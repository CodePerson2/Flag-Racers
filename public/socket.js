var socket = io.connect('/');
socket.on('testerEvent', function(data){document.write(data.description)});
