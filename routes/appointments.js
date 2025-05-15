// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// New Appointment Form
router.get('/new', async (req, res) => {
  try {
    const patients = await Patient.find();
    const doctors = await Doctor.find();
    res.render('appointment_form', { patients, doctors, appointment: null });
  } catch (err) {
    console.log('Error fetching patients and doctors:', err);
    res.redirect('/appointments');
  }
});

// Create New Appointment
router.post('/', async (req, res) => {
  try {
    const { patient, doctor, date, time, reason } = req.body;
    const newAppointment = new Appointment({
      patient,
      doctor,
      date,
      time,
      reason
    });
    await newAppointment.save();
    res.redirect('/appointments');
  } catch (err) {
    console.log('Error creating appointment:', err);
    res.redirect('/appointments');
  }
});

// Edit Appointment Form
router.get('/:id/edit', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patient doctor');
    const patients = await Patient.find();
    const doctors = await Doctor.find();
    res.render('appointment_form', { patients, doctors, appointment });
  } catch (err) {
    console.log('Error fetching appointment details:', err);
    res.redirect('/appointments');
  }
});

// Update Appointment
router.post('/:id', async (req, res) => {
  try {
    const { patient, doctor, date, time, reason } = req.body;
    await Appointment.findByIdAndUpdate(req.params.id, { patient, doctor, date, time, reason });
    res.redirect('/appointments');
  } catch (err) {
    console.log('Error updating appointment:', err);
    res.redirect('/appointments');
  }
});

// Show all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient doctor');
    res.render('appointment', { appointments });
  } catch (err) {
    console.log('Error fetching appointments:', err);
    res.render('appointment', { appointments: [] });
  }
});

module.exports = router;
