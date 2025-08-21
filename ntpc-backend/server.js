// Step 1: Import express and mysql2
const express = require('express');
const mysql = require('mysql2');

// Step 2: Initialize the app
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());


// Step 3: Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 4: Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // set password here if you have one
  database: 'maintenance_form'
});

// Step 5: Connect to database
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Step 6: Root route
app.get('/', (req, res) => {
  res.send('✅ NTPC Preventive Maintenance Backend is running!');
});

// Step 7: POST route to handle equipment form submission
app.post('/submit-form', (req, res) => {
  const {
    equipment_name,
    equipment_number,
    asset_code,
    location,
    department,
    remarks,
    username,
    bmc_staff_name,
    date
  } = req.body;

  const query = `
    INSERT INTO equipment_data 
    (equipment_name, equipment_number, asset_code, location, department, remarks, username, bmc_staff_name, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    equipment_name,
    equipment_number,
    asset_code,
    location,
    department,
    remarks,
    username,
    bmc_staff_name,
    date
  ], (err, result) => {
    if (err) {
      console.error('❌ Insert failed:', err.message);
      res.status(500).send('❌ Error inserting data');
    } else {
      res.send('✅ Equipment data submitted successfully');
    }
  });
});

// View all equipment
app.get('/get-equipment', (req, res) => {
  const query = 'SELECT * FROM equipment_data';

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Failed to fetch equipment:', err.message);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});

// Route to handle feedback form submission
app.post('/submit-feedback', (req, res) => {
  const { name, email, message } = req.body;

  const query = `
    INSERT INTO feedback (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('❌ Feedback insert failed:', err.message);
      res.status(500).send('❌ Error submitting feedback');
    } else {
      res.send('✅ Feedback submitted successfully');
    }
  });
});

// POST route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('❌ Login error:', err.message);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      res.send('✅ Login successful!');
    } else {
      res.status(401).send('❌ Invalid username or password');
    }
  });
});




// Step 8: Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});








