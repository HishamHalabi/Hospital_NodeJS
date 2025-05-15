// models/Department.js
const mongoose = require('mongoose');
const DepartmentSchema = new mongoose.Schema({
  name: String,
  Address: String
});
module.exports = mongoose.model('Department', DepartmentSchema);