const express = require('express');
const router = express.Router();

let departments = []; // In-memory array for simplicity

// Show all departments
router.get('/', (req, res) => {
  res.render('department', { departments });
});

// Add a department
router.post('/add', (req, res) => {
  const { name, address } = req.body;
  departments.push({ _id: Date.now().toString(), name, address });
  res.redirect('/departments');
});

// Edit department
router.post('/edit/:id', (req, res) => {
  const { name, address } = req.body;
  const id = req.params.id;
  departments = departments.map(dep =>
    dep._id === id ? { ...dep, name, address } : dep
  );
  res.redirect('/departments');
});

// Delete department
router.post('/delete/:id', (req, res) => {
  departments = departments.filter(dep => dep._id !== req.params.id);
  res.redirect('/departments');
});

module.exports = router;
