
const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ful_shuttle_app'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');

});

// Sample route to create a new user
app.post('/users', (req, res) => {
    const { name, email, phone_number, password } = req.body;
    const query = `INSERT INTO User (name, email, phone_number, password) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, phone_number, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created', userId: result.insertId });
    });
});

// Sample route to book a shuttle
app.post('/bookings', (req, res) => {
    const { user_id, schedule_id, 

number_of_seats, total_price } = req.body;
    const query = `INSERT INTO Booking (user_id, schedule_id, number_of_seats, total_price) VALUES (?, ?, ?, ?)`;
    db.query(query, [user_id, schedule_id, number_of_seats, total_price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Booking created', bookingId: result.insertId });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
