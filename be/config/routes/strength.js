const express = require('express');
const Strength = require('../models/strength'); // Import the Strength model.
const router = express.Router();

// Route to create a new strength workout
router.post('/add', async (req, res) => {
  try {
    const newWorkout = new Strength(req.body); // Create a new Strength instance.
    await newWorkout.save(); // Save the new workout to the database.
    res.status(201).json(newWorkout); // Respond with the saved workout.
  } catch (error) {
    res.status(400).json({ error: 'Error creating strength workout', message: error.message });
  }
});

// Route to get all strength workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Strength.find(); // Fetch all strength workouts.
    res.status(200).json(workouts); // Respond with the list of workouts.
  } catch (error) {
    res.status(400).json({ error: 'Error fetching strength workouts', message: error.message });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const logs = await Strength.find().sort({ date: -1 });
    res.status(200).json(logs); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching strength logs' });
  }
});

router.post('/add-log', async (req, res) => {
  try {
    const { type, category, warmup, main, sets, reps, restPeriod, weight, logDate } = req.body;

    // Create a new strength log
    const newLog = new Strength({
      type,
      category,
      warmup,
      main,
      sets,
      reps,
      restPeriod,
      weight, // Optional, based on the schema
      logDate: logDate || new Date(), // Default to current date if not provided
    });

    // Save the log to the database
    await newLog.save();

    // Send the saved log as the response
    res.status(201).json({
      message: 'Strength log saved successfully!',
      log: newLog,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error saving strength log',
      message: error.message,
    });
  }
});
// Route to delete a specific strength log by ID
router.delete('/delete-strength-log/:id', async (req, res) => {
  try {
    const logId = req.params.id;  // Get the log ID from the URL parameter

    // Try to delete the strength log with the specified ID
    const deletedLog = await Strength.findByIdAndDelete(logId);

    if (!deletedLog) {
      return res.status(404).json({ error: 'Strength log not found' });
    }

    // Respond with success message if the log was deleted
    res.status(200).json({
      message: 'Strength log deleted successfully!',
      deletedLog,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error deleting strength log',
      message: error.message,
    });
  }
});


module.exports = router; // Export the router.
