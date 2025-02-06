const mongoose = require('mongoose');

// Define Calisthenics workout schema
const calisthenicsSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    default: 'Calisthenics' // Ensures all entries are categorized as Calisthenics
  },
  category: { 
    type: String, 
    required: true,  // Categories like Push-ups, Pull-ups, Legs, etc.
  },
  warmup: [String],  // List of warm-up exercises
  main: [String],    // List of main exercises
  sets: { 
    type: Number, 
    required: true,  // Number of sets for the workout
  },
  reps: { 
    type: String, 
    required: true,  // Repetition range (e.g., "10-15")
  },
 
});

// Create the model based on the schema
const Calisthenics = mongoose.model('Calisthenics', calisthenicsSchema, 'Calisthenics');

module.exports = Calisthenics;
