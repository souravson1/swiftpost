const { Schema, default: mongoose } = require('mongoose');
const validator = require('validator');

const db = require('../db/db');
const plm = require('passport-local-mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter username!'],
    lowercase: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please enter valid email!']
  },
  firstName: {
    type: String,
    required: [true, 'Please enter your first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name']
  },
  phone: {
    type: String
  },
  photo: String,
  password: {
    type: String
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }]
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User