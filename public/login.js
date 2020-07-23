// Get the modal
var modal = document.getElementById('id01');


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function send(type) {
    var xhttp;
    var loc;
    var name, signin, password, password2, adminCheck;

    if (type == "GET"){
        loc = '/signin/';
        name = document.getElementById("signinUser").value;
        password = document.getElementById("signinPass").value;
        signin = {name: name, password: password};

    }
    else{
        loc = '/signup/';
        name = document.getElementById("signupUser").value;
        password = document.getElementById("signupPass").value;
        password2 = document.getElementById("signupPass2").value;
        adminCheck = document.getElementById("admin-check").checked;
        signin = {name: name, password: password, password2: password2, adminCheck: adminCheck};
        if(password != password2){
            alert("passwords do not match.");
            return;
        }
    }
    console.log(loc);



    signin = JSON.stringify(signin);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

            var res = JSON.parse(this.responseText);
            //console.log(res);
            if(res.res == 0){
                if(res.res == 'success'){alert("Account made");}
                else if(res.data.rows == ''){
                    alert('username or password is incorrect');
                }
                else if(res.data.length == 0){
                    alert("wrong password/username");
                }
                else if(res.data[0].username != ''){
                    var url = "UserHomePage.html?" + res.data[0].userid;
                    window.location.replace(url);

                }
                else{
                    console.log("nothing");
                }
            }
            else if(res.res == 1){
                alert("username already exists");
            }
          }


      }
    xhttp.open(type, loc+signin, true);
    xhttp.send();
}


// Cookie function that returns value of cookie name
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Redirects user back to the flag selection page
window.onload = function checkCookie() {
  var user=getCookie("user credentials")
  //alert("You are still logged in, " + checkingCookie);
  if (user != ""){
    var url = "flag.html?" + user;
    window.location.replace(url);
  }
}
