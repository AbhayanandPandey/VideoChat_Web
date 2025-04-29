// server.js (or index.js)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const rooms = {};

io.on('connection', socket => {
  socket.on('join-room', ({ roomId, password }) => {
    if (!roomId) {
      socket.emit('invalid-room');
      return;
    }
    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push(socket.id);

    const otherUsers = rooms[roomId].filter(id => id !== socket.id);
    socket.emit('all-users', otherUsers);

    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { callerID: socket.id });
  });

  socket.on('sending-signal', ({ userToSignal, callerID, signal }) => {
    io.to(userToSignal).emit('user-joined', { signal, callerID });
  });

  socket.on('returning-signal', ({ signal, callerID }) => {
    io.to(callerID).emit('receiving-returned-signal', { signal, id: socket.id });
  });

  socket.on('send-message', ({ roomId, message }) => {
    // broadcast to other users only
    socket.to(roomId).emit('receive-message', { user: 'User', text: message });
  });

  socket.on('disconnect', () => {
    for (const r in rooms) {
      rooms[r] = rooms[r].filter(id => id !== socket.id);
      if (rooms[r].length === 0) delete rooms[r];
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

