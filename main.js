// src/main.js
// src/main.js// src/main.js//Presentation layer
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8001;

// Controllers and Middleware
const authController = require('./controllers/authController');
const flightController = require('./controllers/flightController');
const bookingController = require('./controllers/bookingController');
const authenticateToken = require('./middleware/authMiddleware');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));

// API routes
app.post('/auth/signup', authController.signUp);
app.post('/auth/login', authController.login);
app.get('/flights', flightController.getAllFlights);
app.post('/flights', authenticateToken, flightController.addFlight);
app.get('/bookings', authenticateToken, bookingController.getBookings);
app.post('/bookings', authenticateToken, bookingController.createBooking);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
