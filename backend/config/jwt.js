const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        console.error("❌ JWT_SECRET is missing in .env!");
        throw new Error("JWT_SECRET not found");
      }
    
      return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateToken;
