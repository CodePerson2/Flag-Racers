/*
  ITERATION 1
  Tests that the frequency of user logins was incremented.
  Parameters are the logincount from before user login as pastFreq,
  and logincount after user login as currFreq.
*/
function testFrequency(pastFreq, currFreq) {
  if(pastFreq=== currFreq-1){
    console.log("Frequency incremented successfully");
  }else{
    console.log("Frequency not incremented");
  }
}

/*
  ITERATION 1
  Tests that user is successfully redirected to flag selection page.
*/
function testUserToFlag(){
  const  queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if(queryString== "flag.html?"+urlParams){
    console.log("User successfully directed to flag selection");
  }else{
    console.log("Failed to direct user to flag selection");
  }
}


/*
  ITERATION 1
  Tests that the pressing of an arrow key led to the movement of user car.
  Parameters are the direction of the key pressed (keyDirection),
  the position of the car on the x-y plane before key was pressed (carPosition1),
  and the position of the car on the x-y plane after the key was pressed (carPosition2)
*/
function testArrowRecognition(keyDirection,carPosition1, carPosition2) {
  if(keydirection==right){
    if(carPosition1.x< carPosition2.x){
      console.log("User car responded correctly");
    }else{
      console.log("User car did not respond correctly");
    }
  }else if(keydirection==left){
    if(carPosition1.x > carPosition2.x){
      console.log("User car responded correctly");
    }else{
      console.log("User car did not respond correctly");
    }
  }else if(keydirection==up){
    if(carPosition1.y > carPosition2.y){
      console.log("User car responded correctly");
    }else{
      console.log("User car did not respond correctly");
    }
  }else if(keydirection==down){
    if(carPosition1.y < carPosition2.y){
      console.log("User car responded correctly");
    }else{
      console.log("User car did not respond correctly");
    }
  }
}

/*
  ITERATION 1
  Tests that every flag has been made visible on the flag selection page.
  Parameter is the number of times getFlag() was called by allFlags()in flag.js (It displays each flag)
*/
function testFlagVisibility(numGetFlagCalls){
  if(numGetFlagCalls<193){
    console.log("Failed to display all flags");
  }else{
    console.log("All flags successfully displayed.");
  }
}

/*
  ITERATION 1
  Tests that the user can select a flag.
  Parameter is flagURL variable in setFlag() in flag.js
*/
function testFlagSelection(flagURL){
  if(flagURL== null){
    console.log("Failed to select flag");
  }else{
    console.log("Successfully selected flag");
  }
}

/*
  ITERATION 2
  Tests that player can successfully access chat page.
*/
function testUserToChat() {
  const  queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if(queryString== "Chatbox.html?"+urlParams){
    console.log("User successfully accessed chat page");
  }else{
    console.log("User failed to access chat page");
  }
}

/*
  ITERATION 2
  Tests that the users chosen flag is successfully displayed on their car in race.
  Parameter is image above car
*/
function testCarDisplay(carFlagStatus){

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const page_type = urlParams.get('url');
  if(carFlagStatus.attr('src')== page_type){
    console.log("User selected flag successfully displayed on car");
  }else{
    console.log("Failed to display user selected flag on car");
  }

}

/*
  ITERATION 2- Use depends on placement, can be used for either
  (1)Tests that a new user is redirected to the home page once created at sign up.
  (2)Tests that user does not go to login page when logged in-> is redirected to home page
*/
function userToHome(){
  const  queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  home=0;
  if(queryString== "UserHomePage.html?"+urlParams){
    console.log("User successfully directed to home page");
    home=1;
    return home;
  }else{
    console.log("Failed to direct user to home page");
    return home;
  }
}

/*
  ITERATION 2
  Tests that number of active chat groups is >=0
  Parameter is the number being displayed where the chats are
*/
function testActiveChats(numChats){
  if(numChats<0){
    console.log("Error in display of active chat stats");
  }else{
    console.log("Number of active chats accurately displayed");
  }
}

/*
  ITERATION 2
  Tests that user is redirected to end page when end game button is pressed.
*/
function testEndMenu(){
  const  queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if(queryString== "endPage.html?"+urlParams){
    console.log("User successfully directed to end page");
  }else{
    console.log("User not directed to end page");
  }
}
