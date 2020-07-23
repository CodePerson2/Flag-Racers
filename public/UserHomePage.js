/*
  Sends user to flag selection page-- Hopefully sends username in URL
*/
function race() {
  const  queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get('name');

  window.location = "flag.html?" + name;
  //location.href="flag.html";
}

function chat() {
  location.href="Chatbox.html"
}
