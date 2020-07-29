var socket; //socket connection
var user1;  //element of either racing vehicle
var user2;

function create(){
    socket = io.connect('/');

    user1 = document.getElementById('dot1');
    user2 = document.getElementById('dot2');
}

//type : 'friend' 'random'
//groupid needed only for friend type
//ex begin('friend', 3), begin('random')
function begin(type, groupid = -1){
    socket.emit('begin', {type: type, groupid: groupid});
}

//returns coordinates of other car
//data = {y: yCord, x: xCord}
function liveLoc(){
    socket.on('friendLoc', function(data){
        //console.log(data);
        
        user2.style.left = (data.x + 'px');
        user2.style.top = (data.y + 'px');
        //console.log(data.room);
        return data;
    });
    
}

//sends the x,y variables to server
function sendLoc(x, y){
    socket.emit('clientLoc', {x: x, y: y});
}

function startGame(){
    socket.on('gameStart', function(data){
        console.log(data);
    });
}

//catches end of game/ or connection
function end(){
    socket.on('end', function(data){
        console.log(data.end);
    });
}
function ready(){
    socket.on('ready', function(data){
        socket.emit('ready', 'start');

        socket.off('ready');
    })
}

//updates display for testing file
function updateDisplay(event) {
    sendLoc(event.pageX, event.pageY);
    user1.style.left = (event.pageX + 'px');
    user1.style.top = (event.pageY + 'px');
}

function move(){
    
    document.addEventListener("mousemove", updateDisplay, false);
    document.addEventListener("mouseenter", updateDisplay, false);
    document.addEventListener("mouseleave", updateDisplay, false);
}


create();
begin('friend', 1);
ready();
startGame();
move();
liveLoc();
end();




