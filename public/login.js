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
            console.log(res);
            if(res.res == 0){
                var data = res.data;
                if(data == 'success'){alert("Account made");}
                else if(data.rows == ''){
                    alert('username or password is incorrect');
                }
                else if(data.rows[0].username != ''){
                    var url = "flag.html?" + name;
                    window.location.replace(url);

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