var userid = 1;
var input = document.getElementById("inp");     //id of input of search bar

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
            alert(res.data);
            
            
      }
    }
    xhttp.open("GET", loc+val, true);
    xhttp.send();
}

getfriends();