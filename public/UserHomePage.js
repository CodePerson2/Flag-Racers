/*
  Sends user to flag selection page-- Hopefully sends username in URL
*/
function race() {
  const  queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  window.location = "flag.html?" + urlParams;
  //location.href="flag.html";
}

function chat() {
  const  queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  window.location = "Chatbox.html?" + urlParams;
  //location.href="Chatbox.html"
}
