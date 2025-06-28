const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    jokeText: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Any',
        required: true
    },
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Joke', JokeSchema);    