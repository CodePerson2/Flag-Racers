var userid = 1;
var input = document.getElementById("inp");
console.log(input);

input.addEventListener("keyup", alert("hi"));

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
            
            
            
      }
    xhttp.open("POST", loc+val, true);
    xhttp.send();
}