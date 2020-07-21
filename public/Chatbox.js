//add friend input
var userid = 1;
var input = document.getElementById("inp");
console.log(input);

input.addEventListener("keyup", alert("hi"));

function addFriend(friend){
    var xhttp;
    var loc = '/addfriend/';
    
    val = {"user": userid, "friend": friend};

    val = JSON.stringify(val);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            
            var res = JSON.parse(this.responseText);
            console.log(res);
            
            
            
      }
    xhttp.open("POST", loc+val, true);
    xhttp.send();
}


const messages = [
    "Nice Race",
    "Flags are a lifestyle",
    "Beam me up Scotty",
    "I really like Flags",
    "All my dreams involve flags in some capacity"
  ];
  let counter = 0;
  const chatContainer = document.querySelector(".container");
  const chatArea = document.querySelector(".message-body");
  const text = document.querySelector("#text");
  const form = document.querySelector(".form");
  
  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }
  
  function scroll() {
    chatArea.scroll(0,chatArea.scrollHeight);
  }
  
  function reply(msg) {
    let li = document.createElement("li");
    li.innerHTML = msg;
    li.classList.add("chatbox");
    li.classList.add("chatbox-incoming");
    chatArea.append(li);
    scroll();
  }
  
  
  //EVENT LISTENERS
  text.addEventListener("focus", () => {
    chatContainer.scrollTop = chatArea.scrollHeight + 560;
  });
  
  form.addEventListener("submit", e => {
    e.preventDefault();
    msg = text.value;
    let li = document.createElement("li");
    li.innerHTML = msg;
    li.classList.add("chatbox");
    li.classList.add("chatbox-outgoing");
    chatArea.append(li);
    scroll();
    text.value = "";
    // chatContainer.scrollTop =chatContainer.scrollHeight;
    text.focus();
    setTimeout(reply, 1000, messages[counter]);
    counter++;
    if (counter == messages.length) {
      counter = 0;
    }
  });
  
  window.onload = ()=>{
    reply("Hey. Want to Race?")
  }
  
  //buble body
  //const body = document.querySelector('body');