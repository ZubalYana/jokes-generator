const express = require('express');
const router = express.Router();
const Joke = require('../models/Joke');
router.get("/joke/random", async (req, res) => {
  try {
    const count = await Joke.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const joke = await Joke.findOne().skip(randomIndex);

    if (!joke) {
      return res.status(404).json({ error: "Жарт не знайдено" });
    }

    res.json({ joke: joke.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

module.exports = router;

