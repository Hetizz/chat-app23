'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let user;

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  socket.on('join', (username) => {
    console.log('user joined:', username, socket.id);
    user = {'name': username, 'id': socket.id}
    console.log('user:', user);
    io.emit('chat message', `${username} joined the chat`);
  });

  socket.on('chat message', (msg) => {
    console.log('message:', msg);
    io.emit('chat message', msg);
  });

});

http.listen(3000, () => {
  console.log('listening on port 3000');
});