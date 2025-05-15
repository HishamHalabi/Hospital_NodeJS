const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// GET all patients
router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.render('patient', { patients });
});

// POST add new patient
router.post('/add', async (req, res) => {
  const { name, age, address, gender, dob } = req.body;
  await Patient.create({ name, age, address, gender, dob });
  res.redirect('/patients');
});

// POST edit patient
router.post('/edit/:id', async (req, res) => {
  const { name, age, address, gender, dob } = req.body;
  await Patient.findByIdAndUpdate(req.params.id, {
    name,
    age,
    address,
    gender,
    dob
  });
  res.redirect('/patients');
});

// POST delete patient
router.post('/delete/:id', async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.redirect('/patients');
});

module.exports = router;
