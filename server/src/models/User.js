const { Schema, model } = require('mongoose')

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const User = model('User', UserSchema);

module.exports = User;
