/*
  Sends user to 'race finished' page
*/
function endGame() {
  const  queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

    window.location = "endPage.html?" + urlParams;
  }

  /*
    Sends user to racetrack page
  */
  function startGame() {
    const  queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

      window.location = "racetrack.html?" + urlParams;
  }

  /*
    Sends user to flag selection page
  */
  function selectFlag() {
    const  queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

      window.location = "flag.html?";
  }

/*
  Logs user out
*/
  function logout() {
    document.cookie = "user credentials=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("Login.html");
  }
