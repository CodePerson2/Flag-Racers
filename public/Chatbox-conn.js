var messid = 0;
var userid = -1;
var chatid = -1;
var input = document.getElementById("inp");     //id of input of search bar
/*
var io = io('socket.io');
var socket = io.connect("/io/", {
    reconnection: true
});

socket.on('socketClientID', function (socketClientID) {
    console.log('Connection to server established. SocketID is',socketClientID);
    socket.emit('hello_from_client', 123);
});
*/
function urlid(){
    var val = window.location.href.split('?');
    val = val[1].split('=');
    userid = val[0];
}

input.addEventListener("keyup", function(e){

    if(e.keyCode === 13){
        addFriend(input.value);
    }
});

function addFriend(friend){
    var xhttp;
    var loc = '/addfriend/';
    
    val = {"user": userid, "friend": friend};
    val = JSON.stringify(val);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            
            var res = JSON.parse(this.responseText);
            console.log(res);
            alert(res.data);
            
            
      }
    }
    xhttp.open("POST", loc+val, true);
    xhttp.send();
}

function getfriends(){
    var xhttp;
    var loc = '/getfriend/';
    
    val = {"user": userid};
    val = JSON.stringify(val);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            
            var res = JSON.parse(this.responseText);
            console.log(res);
            insertfriends(res.data);
      }
    }
    xhttp.open("GET", loc+val, true);
    xhttp.send();
}

function insertfriends(values){
    for(var i = 0; i < values.length; i++){
        var friendname;
        var friendid;
        var  chatid = values[i].chatid;
        if(userid == values[i].user1){
            friendid = values[i].user2;
            friendname = values[i].name2;
        }
        else{
            friendid = values[i].user1;
            friendname = values[i].name1;
        }
        var item = document.createElement("li");
        var nm = document.createElement("span");

        nm.classList.add("groupName");
        nm.innerText = friendname;
        item.appendChild(nm);
        item.setAttribute("onclick", "openchat(" + friendid + ", '" + friendname + "', " + chatid + ")");
        document.getElementById("chatlist").append(item);
        

    }

}
function openchat(id, name, chatid){
    document.getElementById("messbody").innerHTML = "";
    document.getElementById("chatname").innerText = name;
    document.getElementById("sendbutton").setAttribute("onclick", "sendchat(" + chatid + ")")
    messid = 0;
    chatid = chatid;
    
    searchMessage = setInterval(function() {
        getchat(chatid, 4);
      }, 2000);

}
function sendchat(chatid){
    var xhttp;
    var loc = '/sendmess/';
    
    val = {"chat": chatid, "message": text.value, "user": userid};
    val = JSON.stringify(val);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            
            var res = JSON.parse(this.responseText);
            console.log(res);
            getchat(chatid, 5);
      }
    }
    xhttp.open("POST", loc+val, true);
    xhttp.send();
}
function getchat(chatid, num){
    var xhttp;
    var loc = '/getmess/';
    console.log(chatid +' ' + num + ' ' + messid);
    val = {"chat": chatid, "num": num, "messid": messid};
    val = JSON.stringify(val);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            
            var res = JSON.parse(this.responseText);
            //console.log(res);
            //console.log((res.data.length - 1));
            if(res.res == -1){
                console.log("fail");
                return;
            }
            for(var i = (res.data.length - 1); i >= 0; i--){
                if(res.data[i].userid == userid){
                    message(res.data[i].message);
                }
                else{
                    reply(res.data[i].message);
                }
            }
            if(res.data.length > 0){messid = res.data[0].messageid;}
            
      }
    }
    xhttp.open("GET", loc+val, true);
    xhttp.send();
}



urlid();
getfriends();