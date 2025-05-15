// models/Patient.js
const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  gender: String,
  dob: Date
});
module.exports = mongoose.model('Patient', PatientSchema);
