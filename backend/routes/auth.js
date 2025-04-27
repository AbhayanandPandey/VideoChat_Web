// Backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const generateToken = require('../config/jwt');
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
    const token = generateToken(user._id);
    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    // If it's a duplicate-key error from Mongo
    if (err.code === 11000) {
      // err.keyValue will tell you which field
      const dupField = Object.keys(err.keyPattern)[0];
      return res
        .status(400)
        .json({ error: `${dupField.charAt(0).toUpperCase() + dupField.slice(1)} already exists` });
    }
    res.status(500).json({ error: 'Server error' });
  }
});


// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    res.json({
      token,
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/auth/dashboard  (protected)
router.get('/dashboard', AuthMiddleware, async (req, res) => {
  try {
    const user = await User
      .findById(req.user.userId)
      .select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/feedback', AuthMiddleware, async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Ensure the user exists
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.responsename = name;
    user.responseemail = email;
    user.responsemessage = message;

    await user.save();

    return res.status(201).json({ message: 'Thank you for your feedback!' });

  } catch (error) {
    console.error('🚨 Error in /feedback:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
