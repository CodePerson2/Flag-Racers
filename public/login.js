// Get the modal
var modal = document.getElementById('id01');

function myFunction() {
  document.getElementById("SignUp").submit();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function get(name, password, type, password2 = NULL) {
    var xhttp;
    var type;
    var loc = "/signin/";
    var signin = {name: name, password: password};

    signin = JSON.stringify(signin);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          
          }
            
            
      }
    };
    xhttp.open(type, loc+person, true);
    xhttp.send();
}