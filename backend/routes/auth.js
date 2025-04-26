const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

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
    console.log('✅ User registered:', username);
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('❌ Error in /register:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret123', { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('❌ Error in /login:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
