const express = require('express');
const Yoga = require('../models/yoga'); // Import the Yoga model.
const router = express.Router();

// Route to create a new yoga workout
router.post('/add', async (req, res) => {
  try {
    const newWorkout = new Yoga(req.body); 
    await newWorkout.save(); 
    res.status(201).json(newWorkout); 
  } catch (error) {
    res.status(400).json({ error: 'Error creating yoga workout', message: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const workouts = await Yoga.find(); 
    res.status(200).json(workouts); 
  } catch (error) {
    res.status(400).json({ error: 'Error fetching yoga workouts', message: error.message });
  }
});

module.exports = router; // Export the router.
