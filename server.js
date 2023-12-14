// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages
  socket.on('message', (data) => {
    console.log('Message received:', data);

    // Broadcast the message to all connected clients
    io.to(data.roomId).emit('message', data.message);
  });

  // Join a room
  socket.on('joinRoom', (roomId) => {
    console.log('User joined room:', roomId);
    socket.join(roomId);
  });

  // Leave a room
  socket.on('leaveRoom', (roomId) => {
    console.log('User left room:', roomId);
    socket.leave(roomId);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
