const express = require('express');
const Calisthenics = require('../models/calisthenics');
const router = express.Router();

// Route to create new calisthenics workout
router.post('/add', async (req, res) => {
  try {
    const newWorkout = new Calisthenics(req.body);
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: 'Error creating workout', message: error.message });
  }
});

// Route to get all calisthenics workouts
router.get('/all', async (req, res) => {
  try {
    const workouts = await Calisthenics.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching workouts', message: error.message });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const logs = await Calisthenics.find().sort({ logDate: -1 }); // Sort logs by date (descending)
    res.status(200).json(logs); // Return logs of completed workouts
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calisthenics logs' }); // Handle errors
  }
});

// Route to add a log for a completed calisthenics workout
router.post('/add-log', async (req, res) => {
  try {
    const { type, category, exercises, sets, reps, logDate } = req.body;

    // Create a new log for the completed workout
    const newLog = new Calisthenics({
      type,
      category,
      exercises,
      sets,
      reps,
      logDate: logDate || new Date(), // Set log date to current date if not provided
    });

    // Save the log to the database
    await newLog.save();

    // Respond with the saved log
    res.status(201).json({
      message: 'Calisthenics log saved successfully!',
      log: newLog,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error saving calisthenics log',
      message: error.message,
    });
  }
});
// Route to delete a specific calisthenics log by ID
router.delete('/delete-calisthenics-log/:id', async (req, res) => {
  try {
    const logId = req.params.id;  // Get the log ID from the URL parameter

    // Try to delete the calisthenics log with the specified ID
    const deletedLog = await Calisthenics.findByIdAndDelete(logId);

    if (!deletedLog) {
      return res.status(404).json({ error: 'Calisthenics log not found' });
    }

    // Respond with success message if the log was deleted
    res.status(200).json({
      message: 'Calisthenics log deleted successfully!',
      deletedLog,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error deleting calisthenics log',
      message: error.message,
    });
  }
});


module.exports = router;
