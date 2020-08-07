/*
  Sends user to flag selection page-- Hopefully sends username in URL
*/
function race() {
  const  queryString = window.location.search;

  var val = window.location.href.split('?');
  window.location = "flag.html?" + 'uid='+ val[1];
  //location.href="flag.html";
}

function chat() {
  var val = window.location.href.split('?');
  val = val[1].split("%");

  window.location = "Chatbox.html?" + val[0];
  //location.href="Chatbox.html"
}

/*
 Logout function from flag.js
*/
function logout(){
  document.cookie = "user credentials=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.replace("Login.html");
}

function settings() {
  const  queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  window.location = "Settings.html?" + urlParams;
}

/*
  Hide all forms
*/
function hideForm(){
  document.getElementById('fForm').style.display='none';
}
/*
  Shows add friend form
*/
function showForm(){
  document.getElementById('fForm').style.display='block';
}


/*
  From Chatbox-conn.js
*/
function addFriend(){
  var xhttp;
  var loc = '/addfriend/';
  friend = document.getElementById("f_username").value;

  var val = window.location.href.split('?');
  val = val[1].split('=');
  userid = val[0];

  val = {"user": userid, "friend": friend};
  val = JSON.stringify(val);
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

          var res = JSON.parse(this.responseText);
          console.log(res);
          if(res.res == 0){
              hideForm();
          }


    }
  }
  xhttp.open("POST", loc+val, true);
  xhttp.send();
}
