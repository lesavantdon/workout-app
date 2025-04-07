const express = require('express');
const router = express.Router();
const WeekendExercise = require('../models/weekendExercises');

// GET all weekend activities
router.get('/', async (req, res) => {
  try {
    const activities = await WeekendExercise.find();
    res.json(activities);
  } catch (error) {
    console.error('Error fetching weekend activities:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new weekend activity
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const newActivity = new WeekendExercise({ name, description });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error creating weekend activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
