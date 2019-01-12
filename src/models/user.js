const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.Model('User', UserSchema);

module.exports = User;
