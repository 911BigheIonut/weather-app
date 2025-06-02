const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
  console.error('Registration error:', err);
  res.status(400).json({ error: 'User already exists or invalid data' });
}
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: '1d'
  });

  res.json({ token, user: { username: user.username } });
});

// Change Password
router.post('/change-password', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).send({ error: 'User not found' });

  user.password = password;
  await user.save();
  res.send({ success: true });
});

// Delete Account
router.post('/delete', async (req, res) => {
  const { username } = req.body;
  await User.deleteOne({ username });
  res.send({ success: true });
});


module.exports = router;
