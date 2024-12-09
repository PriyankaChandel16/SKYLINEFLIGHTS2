// src/services/flightService.js
const db = require('../db/db');

// Fetch all available flights
async function getAllFlights() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM flights`;
    db.all(query, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// Add a new flight
async function addFlight(flight_number, origin, destination, departure_time, arrival_time, price) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO flights (flight_number, origin, destination, departure_time, arrival_time, price) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [flight_number, origin, destination, departure_time, arrival_time, price], function(err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, flight_number, origin, destination, departure_time, arrival_time, price });
    });
  });
}

// Fetch a specific flight by ID
async function getFlightById(id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM flights WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = { getAllFlights, addFlight, getFlightById };
