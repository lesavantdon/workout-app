// models/Cardio.js
const mongoose = require('mongoose');

// Define your workout schema
const workoutSchema = new mongoose.Schema({
  type: { type: String, required: true },        
  category: { type: String, required: true },    
  warmup: [String],                              
  main: [String],                               
});


const Cardio = mongoose.model('Cardio', workoutSchema, 'Cardio'); 
module.exports = Cardio;