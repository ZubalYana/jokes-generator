const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = 5000;
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));