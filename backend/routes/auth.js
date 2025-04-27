const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const generateToken = require('../config/jwt');

// Register
router.post('/register', async (req, res) => {
  const { username,email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username,email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registered and logged in', token: generateToken(user._id) });
    console.log('✅ User registered:', username);
  } catch (error) {
    console.error('❌ Error in /register:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try{
  const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); 

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const userData = user.toObject();
    delete userData.password;

    res.json({ token: generateToken(user._id), user: userData });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

router.get('/dashboard', AuthMiddleware, async (req, res) => {
  
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ decode the token first

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const data = {
      username: user.username,
      email: user.email,
    };

    res.json({ user }); // ✅ send user inside object
  } catch (error) {
    console.error('❌ Error in /dashboard:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


module.exports = router;