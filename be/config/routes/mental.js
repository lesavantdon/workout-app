const express = require('express');
const MentalExercise = require('../models/mental'); // Adjust the path if needed
const router = express.Router();

// GET all mental exercises
router.get('/', async (req, res) => {
  try {
    const mentalExercises = await MentalExercise.find();
    res.json(mentalExercises);
  } catch (error) {
    console.error('Error fetching mental exercises:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a specific mental exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await MentalExercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Mental exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    console.error('Error fetching mental exercise:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new mental exercise
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    
    const newExercise = new MentalExercise({ name, description });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    console.error('Error creating mental exercise:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
