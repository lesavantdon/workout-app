const mongoose = require('mongoose');

const MentalExerciseSchema = new mongoose.Schema({
  name: { type: String, default: "Mental" },
  description: { type: String }, // Optional description of the activity
  lastUsed: { type: String, default: null },
});

module.exports = mongoose.model('Mental', MentalExerciseSchema, 'mental');
