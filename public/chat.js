'use strict';

//const socket = io('http://localhost:3000');
const socket = io('http://mediajakelu.norwayeast.cloudapp.azure.com:3000');

let user;

// Join chat
document.querySelector('#joinForm').addEventListener('submit', (event) => {
  event.preventDefault();
  // username from the input field
  user = document.getElementById('nameInput').value;
  console.log('chat.js: username+id', user, socket.id);
  // send the username to server
  socket.emit('join', user);
  document.querySelector('#joinForm').style.display = "none";
  document.querySelector('#messageForm').style.display = "flex";
});

// Send message
document.querySelector('#messageForm').addEventListener('submit', (event) => {
  event.preventDefault();
  // message text from the input field
  const inp = document.getElementById('messageInput');
  console.log('chat.js: message', inp.value, user);
  // send the message with username to server
  let chatMsg = user + ': ' + inp.value;
  console.log('chat.js: chatMsg', chatMsg);
  socket.emit('chat message', chatMsg);
  inp.value = '';
});

// Receive and print message
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.innerText = msg;
  document.getElementById('messageList').appendChild(item);
});