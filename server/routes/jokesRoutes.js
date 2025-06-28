const express = require('express');
const router = express.Router();
const Joke = require('../models/Joke');

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

router.get('/jokes', async (req, res) => {
    try {
        const jokes = await Joke.find();
        res.json(jokes);
    } catch (error) {
        console.error('Error fetching jokes:', error);
        res.status(500).json({ message: 'Failed to fetch jokes', error });
    }
//  817d5396eac8832ba2a3bbd53dc2fbafbcf5515b
});

module.exports = router;

