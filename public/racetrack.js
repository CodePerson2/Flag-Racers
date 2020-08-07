/*
  Sends user to 'race finished' page
*/
function endGame() {
    const  queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

      urlParams.delete('status');

    window.location = "endPage.html?" + urlParams;
  }

  /*
    Sends user to racetrack page
  */
  function startGame() {
    const  queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

        urlParams.delete('status');

      window.location = "racetrack.html?" + urlParams;
  }

  /*
    Sends user to flag selection page
  */
  function selectFlag() {
    const  queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    urlParams.delete('status');
        urlParams.delete('url');

      window.location = "flag.html?" + urlParams;
  }
  function home(){
    var val = window.location.href.split('?');
    var id = val[1].split('&');
    var id = id[0].split('%');
    var id = id[0].split('=');
    window.location = "UserHomePage.html?" + id[1];
  }

/*
  Logs user out
*/
  function logout() {
    document.cookie = "user credentials=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("Login.html");
  }
