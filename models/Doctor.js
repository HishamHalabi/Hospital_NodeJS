// models/Doctor.js
const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  contact: String,
  department: String
});
module.exports = mongoose.model('Doctor', DoctorSchema);
