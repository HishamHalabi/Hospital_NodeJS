const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && user.password === password) {
    req.session.user = user;
    return res.redirect('/dashboard'); // Dashboard logic is handled in server.js
  }
  res.render('login', { error: 'Invalid credentials' });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Signup Page
router.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

// Handle Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.render('signup', { error: 'Username already taken' });
  }

  const newUser = new User({ username, password });
  await newUser.save();
  req.session.user = newUser;
  res.redirect('/dashboard'); // Dashboard logic is handled in server.js
});

module.exports = router;
