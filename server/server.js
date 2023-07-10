const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8081', // Replace with the appropriate client URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message); // Broadcast the received message to all connected clients
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
