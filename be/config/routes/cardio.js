const express = require('express');
const Cardio = require('../models/cardio'); // Import the Cardio model.
const router = express.Router();

// Route to create a new cardio workout
router.post('/add', async (req, res) => {
  try {
    const newWorkout = new Cardio(req.body); // Create a new Cardio instance.
    await newWorkout.save(); // Save the new workout to the database.
    res.status(201).json(newWorkout); // Respond with the saved workout.
  } catch (error) {
    res.status(400).json({ error: 'Error creating cardio workout', message: error.message });
  }
});

// Route to get all cardio workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Cardio.find(); // Fetch all cardio workouts.
    res.status(200).json(workouts); // Respond with the list of workouts.
  } catch (error) {
    res.status(400).json({ error: 'Error fetching cardio workouts', message: error.message });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const { sortBy = 'date', order = 'desc' } = req.query; 
    const sortOrder = order === 'asc' ? 1 : -1;

    const logs = await Cardio.find().sort({ [sortBy]: sortOrder });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cardio logs', message: error.message });
  }
});
router.post('/add-log', async (req, res) => {
  try {
    const { type, category, warmup, main, duration, distance, logDate } = req.body;

    // Create a new cardio log
    const newLog = new Cardio({
      type,
      category,
      warmup,
      main,
      duration, // Optional field for workout duration
      distance, // Optional field for workout distance
      logDate: logDate || new Date(), // Default to current date if not provided
    });

    // Save the log to the database
    await newLog.save();

    // Send the saved log as the response
    res.status(201).json({
      message: 'Cardio log saved successfully!',
      log: newLog,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error saving cardio log',
      message: error.message,
    });
  }
});
// Route to delete a specific cardio log by ID
router.delete('/delete-cardio-log/:id', async (req, res) => {
  try {
    const logId = req.params.id;  // Get the log ID from the URL parameter

    // Try to delete the cardio log with the specified ID
    const deletedLog = await Cardio.findByIdAndDelete(logId);

    if (!deletedLog) {
      return res.status(404).json({ error: 'Cardio log not found' });
    }

    // Respond with success message if the log was deleted
    res.status(200).json({
      message: 'Cardio log deleted successfully!',
      deletedLog,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error deleting cardio log',
      message: error.message,
    });
  }
});

module.exports = router; // Export the router.
