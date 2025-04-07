// models/Cardio.js
const mongoose = require('mongoose');

// Define your workout schema
const workoutSchema = new mongoose.Schema({
  type: { type: String, default:"Cardio"},        
  category: { type: String, required: true },    
  warmup: [String],                              
  main: [String],  
  lastUsed: { type: String, default: null },                             
});


const Cardio = mongoose.model('Cardio', workoutSchema, 'cardio'); 
module.exports = Cardio;