/*
  Sends user to flag selection page-- Hopefully sends username in URL
*/
function race() {
  const  queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  //const name = urlParams.get('name');
  console.log(name);
  window.location = "flag.html?" + urlParams;
  //location.href="flag.html";
}

function chat() {
  /*const  queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get('name');
  alert(name);
  window.location = "Chatbox.html?" + name;*/
  location.href="Chatbox.html"
}
