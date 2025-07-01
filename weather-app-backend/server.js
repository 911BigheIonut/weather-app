const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const favoritesRoute = require('./routes/favorites');
app.use('/api/favorites', favoritesRoute);

app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.send('API is working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
