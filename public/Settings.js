
/*
  Sends user back to home page
*/
function backHome() {
  const  queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  window.location = "UserHomePage.html?" + urlParams;
}
/*
 Logout function from flag.js
*/
function logout(){
  document.cookie = "user credentials=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.replace("Login.html");
}

/*
  Hide all forms
*/
function hideForm(){
  document.getElementById('PForm').style.display='none';
  document.getElementById('UForm').style.display='none';
  document.getElementById('FForm').style.display='none';
  document.getElementById('DForm').style.display='none';
}
/*
  Shows change password form
*/
function showPForm(){
  document.getElementById('PForm').style.display='block';
}
/*
  Function that changes password
*/
function changePass(){
  var xhttp;
  var loc;
  var name, changePassword, password, newPassword, passCheck;

  loc = '/changePassword/';
  name = document.getElementById("username").value;
  password = document.getElementById("password").value;
  newPassword = document.getElementById("newPassword").value;
  passCheck = document.getElementById("newPassword2").value;

  //If 'new password' and 're-enter new password' match:
  if(newPassword===passCheck){

    changePassword = {name: name, password: password, newPassword: newPassword};
    changePassword = JSON.stringify(changePassword);

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.readyState);
      if (this.readyState == 4 && this.status == 200) {
            console.log("request finished and response is ready");
            var res = JSON.parse(this.responseText);
            console.log(res);

          }
      }
    console.log("Here.");
    xhttp.open("POST", loc+changePassword, true);
    xhttp.send();
  }else{
    // If 'new password' and 're-enter new password' don't match:
    alert("New password and password re-entry don't match");
  }


}

/*
  Shows change username form
*/
function showUForm(){
  document.getElementById('UForm').style.display='block';
}
/*
  Function that changes username
*/
function changeUserN(){
  var xhttp;
  var loc;
  var name, changeUsername, password, friend;

  loc = '/changeUsername/';
  name = document.getElementById("username").value;
  password = document.getElementById("password").value;
  newName = document.getElementById("newUsername").value;

  changeUsername = {name: name, password: password, newName: newName};
  changeUsername = JSON.stringify(changeUsername);

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
          console.log("request finished and response is ready");
          var res = JSON.parse(this.responseText);
          console.log(res);

        }
    }
    console.log("Here");
  xhttp.open('POST', loc+changeUsername, true);
  xhttp.send();
}

/*
  Function shows remove friend form
*/
function showFForm(){
  document.getElementById('FForm').style.display='block';
}
/*
  Function that removes friend
*/
function removeFriend(){
  var xhttp;
  var loc;
  var name, removeFriend, password, friend;

  loc = '/removeFriend/';
  name = document.getElementById("username").value;
  password = document.getElementById("password").value;
  friend = document.getElementById("friend").value;

  removeFriend = {name: name, password: password, friend: friend};
  removeFriend = JSON.stringify(removeFriend);

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
          console.log("request finished and response is ready");
          var res = JSON.parse(this.responseText);
          console.log(res);

        }
    }
    console.log("Here.");
  xhttp.open('POST', loc+removeFriend, true);
  xhttp.send();
}

/*
  Shows delete account form
*/
function showDForm(){
  document.getElementById('DForm').style.display='block';
}
/*
  Function that deletes account
*/
function deleteAcc() {
    var xhttp;
    var loc;
    var name, deleteAcc, password;

    loc = '/deleteAcc/';
    name = document.getElementById("username").value;
    password = document.getElementById("password").value;

    deleteAcc = {name: name, password: password};
    deleteAcc = JSON.stringify(deleteAcc);

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            console.log("request finished and response is ready");
            var res = JSON.parse(this.responseText);
            console.log(res);

          }
      }
      console.log("Here.");
    xhttp.open('POST', loc+deleteAcc, true);
    xhttp.send();
}
