const mongoose = require('mongoose');

// Define Calisthenics workout schema
const calisthenicsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: false,
    default: 'Calisthenics',
  },
  category: {
    type: String,
    required: false, 
  },
  exercise: { 
    type: String, // Add exercise as a new field if needed
    required: false,
  },
  reps: { 
    type: String, 
    required: false, 
  },
  sets: { 
    type: String, 
    required: false,
  },
  duration: {
    type: String,
    required: false,
  }
});

// Create the model based on the schema
const Calisthenics = mongoose.model('Calisthenics', calisthenicsSchema, 'Calisthenics');

module.exports = Calisthenics;
