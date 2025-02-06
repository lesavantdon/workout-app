const mongoose = require('mongoose');

const mentalExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // Optional description of the activity
});

module.exports = mongoose.model('Mental', mentalExerciseSchema, 'Mental');
