const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' }
});

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const rooms = {};

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push(socket.id);

    // Notify others in room
    socket.to(roomId).emit('user-connected', socket.id);

    // Relay offer/answer/ICE to other peers
    socket.on('offer', data => socket.to(data.target).emit('offer', { sdp: data.sdp, sender: socket.id }));
    socket.on('answer', data => socket.to(data.target).emit('answer', { sdp: data.sdp, sender: socket.id }));
    socket.on('ice-candidate', data => socket.to(data.target).emit('ice-candidate', { candidate: data.candidate, sender: socket.id }));

    socket.on('chat-message', data => {
      io.to(roomId).emit('chat-message', { user: socket.id, message: data });
    });

    socket.on('disconnect', () => {
      rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
      socket.to(roomId).emit('user-disconnected', socket.id);
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
