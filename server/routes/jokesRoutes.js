const express = require('express');
const router = express.Router();
const Joke = require('../models/Jokes');

router.post('/joke', (req, res) => {
    console.log(req.body);
});

module.exports = router;
