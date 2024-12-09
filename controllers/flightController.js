// src/controllers/flightController.js
const flightService = require('../services/flightService');

// Route to fetch all available flights
async function getAllFlights(req, res) {
  try {
    const flights = await flightService.getAllFlights();
    res.status(200).json({ flights });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Route to add a new flight
async function addFlight(req, res) {
  const { flight_number, origin, destination, departure_time, arrival_time, price } = req.body;
  
  if (!flight_number || !origin || !destination || !departure_time || !arrival_time || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const flight = await flightService.addFlight(flight_number, origin, destination, departure_time, arrival_time, price);
    res.status(201).json({ message: 'Flight added successfully', flight });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Route to fetch flight details by ID
async function getFlightById(req, res) {
  const { id } = req.params;

  try {
    const flight = await flightService.getFlightById(id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json({ flight });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllFlights, addFlight, getFlightById };
