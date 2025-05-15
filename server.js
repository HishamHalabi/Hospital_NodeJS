
// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();


// Username is not real
const uri = "mongodb+srv://ssssssss:3DH8lLJcIK7Q72zA@hospital.sp5kfiq.mongodb.net/?retryWrites=true&w=majority&appName=Hospital";

mongoose.connect(uri)
  .then(() => {
    console.log("yo yo yooooooo");
  })
  .catch((err) => {
    console.log("error connecting to DB:", err.message);
  });

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'hospital_secret',
  resave: false,
  saveUninitialized: false
}));

// Auth Middleware
function ensureAuth(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// Routes
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const departmentRoutes = require('./routes/departments');
const descriptionRoutes = require('./routes/descriptions');
const appointmentRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');

app.get('/', (req, res) => res.redirect('/dashboard'));
app.use('/', authRoutes);
app.use('/patients', ensureAuth, patientRoutes);
app.use('/doctors', ensureAuth, doctorRoutes);
app.use('/departments', ensureAuth, departmentRoutes);
app.use('/descriptions', ensureAuth, descriptionRoutes);
app.use('/appointments', ensureAuth, appointmentRoutes);



// Extend dashboard to include patients list
const Patient = require('./models/Patient');
app.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.render('dashboard', { user: req.session.user, patients });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.render('dashboard', { user: req.session.user, patients: [], error: 'Could not load patients.' });
  }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
