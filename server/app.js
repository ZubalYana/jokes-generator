const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = 5000;
const jokesRoutes = require('./routes/jokesRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(express.json());

app.use(express.json());
app.use('/', jokesRoutes);
app.use('/', adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));