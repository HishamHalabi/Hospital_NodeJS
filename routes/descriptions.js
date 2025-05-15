const express = require('express');
const router = express.Router();
const Description = require('../models/Description');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Department = require('../models/Department');

// GET all descriptions
router.get('/', async (req, res) => {
  const descriptions = await Description.find()
    .populate('patient')
    .populate('doctor')
    .populate('department');
  const patients = await Patient.find();
  const doctors = await Doctor.find();
  const departments = await Department.find();
  res.render('description', { descriptions, patients, doctors, departments });
});

// POST add new description
router.post('/add', async (req, res) => {
  const { patient, doctor, diagnosis, department } = req.body;
  await Description.create({ patient, doctor, diagnosis, department });
  res.redirect('/descriptions');
});

// POST edit description
router.post('/edit/:id', async (req, res) => {
  const { patient, doctor, diagnosis, department } = req.body;
  await Description.findByIdAndUpdate(req.params.id, {
    patient,
    doctor,
    diagnosis,
    department
  });
  res.redirect('/descriptions');
});

// POST delete
router.post('/delete/:id', async (req, res) => {
  await Description.findByIdAndDelete(req.params.id);
  res.redirect('/descriptions');
});

module.exports = router;
