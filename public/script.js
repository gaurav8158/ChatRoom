var socket = io();

let username = "";

document.getElementById("join-btn").addEventListener("click",(event)=>{
event.preventDefault();

username = document.getElementById("username").value;
if(username.trim() != ""){
    document.querySelector(".username-popup").style.display="none";
    document.querySelector(".chat-container").style.display="flex";
document.querySelector(".chat-head").innerText='ChatRoom - '+ username;
socket.emit("username enter", username);
}
else{
alert("Username can't be empty");
}
});

document.getElementById("send-btn").addEventListener("click", (event) => {
    event.preventDefault();
  
    const data = {
      username: username,
      message: document.getElementById("message-input").value,
    };
    // emission, emit
    // emit the message to the watchman -> give message to watchman
    socket.emit("message", data);
    // communicate with the watchman that a message is sent to
    addMessage(data, true);
  });
  
  // receive user enterred
  socket.on("username enter", (data) => {
    console.log(data,username);
    if (data !== username) {
      var msgDiv = document.createElement("div");
      msgDiv.innerText = `${data} has enterred!`;
      document.querySelector("#messages-container").appendChild(msgDiv);
    }
  });
  
  // receive message
  socket.on("message", (data) => {
    if (data.username !== username) {
      addMessage(data, false);
    }
  });
  
  function addMessage(data, flag) {
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data.username}: ${data.message}`;
    if (flag) {
      msgDiv.setAttribute("class", "message sent");
    } else {
      msgDiv.setAttribute("class", "message received");
    }
  
    document.querySelector("#messages-container").appendChild(msgDiv);
  }
  
  // function if some sender sends a message , receive that message and append  child
  
  document.getElementById("exit-btn").addEventListener("click", () => {
    socket.emit("username left", username);
  });
  
  // receive message
  socket.on("username left", (data) => {
    if (data !== username) {
      var msgDiv = document.createElement("div");
      msgDiv.innerText = `${data} has left!`;
      document.querySelector("#messages-container").appendChild(msgDiv);
    }
  });
