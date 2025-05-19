require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const animeRoutes = require('./routes/animeRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/anime', animeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
