const express = require('express');
const router = express.Router();
const Joke = require('../models/Jokes');
const bot = require('../bot');

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

router.post('/joke', async (req, res) => {
    try {
        const { jokeText, category, author, email } = req.body;
        const newJoke = new Joke({ jokeText, category, author, email, isVerified: false });
        const savedJoke = await newJoke.save();

        await bot.sendMessage(TELEGRAM_CHAT_ID, `🆕 New joke submitted:\n\n${savedJoke.jokeText}`, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Verify', callback_data: `verify_${savedJoke._id}` },
                        { text: '❌ Reject', callback_data: `reject_${savedJoke._id}` }
                    ]
                ]
            }
        });

        res.status(201).json({ message: 'Joke saved and sent for verification', joke: savedJoke });
    } catch (error) {
        console.error('Error saving or sending joke:', error);
        res.status(500).json({ message: 'Failed to save or send joke', error });
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
})

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
router.patch('/jokes/:id/like', async (req, res) => {
  try {
    const joke = await Joke.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!joke) return res.status(404).json({ error: 'Joke not found' });

    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like joke' });
  }
});
router.patch('/jokes/:id/dislike', async (req, res) => {
  try {
    const joke = await Joke.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );

    if (!joke) {
      return res.status(404).json({ error: 'Joke not found' });
    }

    res.json(joke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to dislike joke' });
  }
});
module.exports = router;

