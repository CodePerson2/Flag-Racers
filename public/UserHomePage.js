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
