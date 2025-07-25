const express = require('express');
const router = express.Router();
const Joke = require('../models/Jokes');

router.post('/verify', async (req, res) => {
    try {
        const { jokeId } = req.body;
        const updated = await Joke.findByIdAndUpdate(jokeId, { isVerified: true }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Joke not found' });
        }
        res.json({ message: 'Joke verified successfully', joke: updated });
    } catch (error) {
        console.error('Error verifying joke:', error);
        res.status(500).json({ message: 'Failed to verify joke', error });
    }
});

router.post('/reject', async (req, res) => {
    try {
        const { jokeId } = req.body;
        const deleted = await Joke.findByIdAndDelete(jokeId);

        if (!deleted) {
            return res.status(404).json({ message: 'Joke not found' });
        }

        res.json({ message: 'Joke rejected and deleted', joke: deleted });
    } catch (error) {
        console.error('Error rejecting joke:', error);
        res.status(500).json({ message: 'Failed to reject joke', error });
    }
});

module.exports = router;
