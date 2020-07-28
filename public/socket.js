var socket = io.connect('/');
//socket.on('num', function(data){document.write(data.description)});

//var box = document.querySelector(".box");
var dot1 = document.getElementById('dot1');
var dot2 = document.getElementById('dot2');
//var pageY = document.getElementById("y");

socket.on('friendLoc', function(data){
    //console.log(data);
    
    dot2.style.left = (data.x + 'px');
    dot2.style.top = (data.y + 'px');
    //console.log(data.x);
    
});

function updateDisplay(event) {
    socket.emit('clientLoc', {x: event.pageX, y: event.pageY});
  dot1.style.left = (event.pageX + 'px');
  dot1.style.top = (event.pageY + 'px');


}

document.addEventListener("mousemove", updateDisplay, false);
document.addEventListener("mouseenter", updateDisplay, false);
document.addEventListener("mouseleave", updateDisplay, false);


