const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // For dev, use your React frontend URL in prod
    methods: ['GET', 'POST']
  }
});

app.use(cors());

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on('connection', socket => {
  console.log(`New connection: ${socket.id}`);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
    console.log(`${userId} joined room ${roomId}`);

    socket.on('offer', ({ target, sdp }) => {
      io.to(target).emit('offer', { sender: socket.id, sdp });
    });

    socket.on('answer', ({ target, sdp }) => {
      io.to(target).emit('answer', { sender: socket.id, sdp });
    });

    socket.on('ice-candidate', ({ target, candidate }) => {
      io.to(target).emit('ice-candidate', { sender: socket.id, candidate });
    });

    socket.on('chat-message', data => {
      io.to(roomId).emit('chat-message', data);
    });

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', socket.id);
      console.log(`User disconnected: ${socket.id}`);
    });
  });
});
