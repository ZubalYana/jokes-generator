const express = require('express');
const router = express.Router();
const Joke = require('../models/Joke');

router.post('/joke', async (req, res) => {
    try {
        const { jokeText, category, author, email } = req.body;
        const newJoke = new Joke({ jokeText, category, author, email, isVerified: false });
        const savedJoke = await newJoke.save();
        res.status(201).json({ message: 'Joke saved successfully', joke: savedJoke });
    } catch (error) {
        console.error('Error saving joke:', error);
        res.status(500).json({ message: 'Failed to save joke', error });
    }
});

router.get('/joke/random', async (req, res) => {
    try {
        const randomJoke = await Joke.aggregate([
            { $match: { isVerified: true } },
            { $sample: { size: 1 } }
        ]);
        if (randomJoke.length === 0) {
            return res.status(404).json({ message: 'No verified jokes found' });
        }
        res.json(randomJoke[0]);
    } catch (error) {
        console.error('Error fetching random joke:', error);
        res.status(500).json({ message: 'Failed to fetch random joke', error });
    }
});

router.get('/jokes/stats', async (req, res) => {
    try {
        const total = await Joke.countDocuments();
        const verified = await Joke.countDocuments({ isVerified: true });
        const unverified = await Joke.countDocuments({ isVerified: false });
        res.json({ total, verified, unverified });
    } catch (error) {
        console.error('Error getting joke stats:', error);
        res.status(500).json({ message: 'Failed to fetch joke stats', error });
    }
//  817d5396eac8832ba2a3bbd53dc2fbafbcf5515b
});

module.exports = router;

