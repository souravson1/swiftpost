const { Schema, default: mongoose } = require('mongoose');
const validator = require('validator');

const db = require('../db/db');

const postSchema = new Schema({
    picture: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    caption: String,
    date: {
        type: Date,
        default: Date.now()
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]
});


const User = mongoose.model('Post', postSchema);

module.exports = User