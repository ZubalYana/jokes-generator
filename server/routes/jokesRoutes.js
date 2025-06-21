const express = require('express');
const router = express.Router();
const Joke = require('../models/Jokes');

router.post('/joke', async (req, res) => {
    try {
        console.log(req.body);
        const { jokeText, category, author, email } = req.body;

        const newJoke = new Joke({
            jokeText,
            category,
            author,
            email,
            isVerified: false
        })

        const savedJoke = await newJoke.save();
        res.status(201).json({ message: 'Joke saved successfully', joke: savedJoke });
    } catch (err) {
        console.error('Error saving joke:', error);
        res.status(500).json({ message: 'Failed to save joke', error });
    }
});

module.exports = router;
