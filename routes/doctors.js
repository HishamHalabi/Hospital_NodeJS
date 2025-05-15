const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.render('doctor', { doctors });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.render('doctor', { doctors: [], error: 'Could not load doctors.' });
  }
});

// POST create new doctor
router.post('/add', async (req, res) => {
  const { name, specialization, contact, gender } = req.body;
  const newDoctor = new Doctor({ name, specialization, contact, gender });

  try {
    await newDoctor.save();
    res.redirect('/doctors');
  } catch (err) {
    console.error('Error adding doctor:', err);
    res.redirect('/doctors');
  }
});

// POST edit doctor
router.post('/edit/:id', async (req, res) => {
  const { name, specialization, contact, gender } = req.body;

  try {
    await Doctor.findByIdAndUpdate(req.params.id, {
      name,
      specialization,
      contact,
      gender
    });
    res.redirect('/doctors');
  } catch (err) {
    console.error('Error updating doctor:', err);
    res.redirect('/doctors');
  }
});

// POST delete doctor
router.post('/delete/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.redirect('/doctors');
  } catch (err) {
    console.error('Error deleting doctor:', err);
    res.redirect('/doctors');
  }
});

module.exports = router;
