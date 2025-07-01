const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get favorites
router.get('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ favorites: user.favorites || [] });
});

// Add favorite
router.post('/add', async (req, res) => {
  const { username, favorite } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.favorites = user.favorites || [];
  const exists = user.favorites.some(f =>
    f.name === favorite.name && f.country === favorite.country
  );

  if (!exists) {
    user.favorites.push(favorite);
    await user.save();
  }

  res.json({ success: true, favorites: user.favorites });
});

// Remove favorite
router.post('/remove', async (req, res) => {
  const { username, name } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.favorites = (user.favorites || []).filter(f => f.name !== name);
  await user.save();

  res.json({ success: true, favorites: user.favorites });
});

module.exports = router;
