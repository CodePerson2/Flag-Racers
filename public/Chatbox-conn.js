var userid = 1;
var input = document.getElementById("inp");     //id of input of search bar
var socket = io();  //socket
socket.connect("/io/");
socket.emit('chat message', "hi");

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
        item.setAttribute("onclick", "openchat(" + friendid + ", '" + friendname + "')");
        document.getElementById("chatlist").append(item);
        

    }

}
function openchat(id, name){
    document.getElementById("chatname").innerText = name;
}
function sendchat(){
    socket.emit('chat message', "hi");
}

form.addEventListener("submit", sendchat());

getfriends();