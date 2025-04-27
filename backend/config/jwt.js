// Backend/config/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in .env');
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

module.exports = generateToken;
