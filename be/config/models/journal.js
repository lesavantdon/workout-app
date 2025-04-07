const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  workoutType: { type: String, required: true }, // E.g. "Strength", "Cardio"
  category: { type: String, required: true }, // E.g. "Chest", "Back", etc.
  warmup: { type: [String], required: true }, // Warmup exercises
  main: { type: [String], required: true }, // Main exercises
  notes: { type: String }, // Optional extra notes for the workout
  lastUsed: { type: String, default: null },
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
