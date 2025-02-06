const mongoose = require('mongoose');
const strengthSchema = new mongoose.Schema({
 
  type: { 
    type: String, 
    required: true, 
    default: 'Strength' // Ensures every entry is marked as "Strength"
  },
  category: { 
    type: String, 
    required: true,  // Category like Chest, Back, Arms, Legs, Shoulders
  },
  warmup: [String], // Array of warm-up exercises as strings
  main: [String],   // Array of main exercises as strings
  sets: { 
    type: Number, 
    required: false,  // The number of sets for the workout
  }
});

// Create model based on the schema
const Strength = mongoose.model('Strength', strengthSchema, 'Strength');

module.exports = Strength;
