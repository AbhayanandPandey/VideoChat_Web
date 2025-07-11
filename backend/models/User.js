const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  responsename: { type: String, required: false },
  responseemail: { type: String, required: false },
  responsemessage: { type: String, required: false },
  
}, { timestamps: true } 
);

module.exports = mongoose.model('User', UserSchema);
