const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Strength Training, Cardio, etc.
  date: { type: Date, default: Date.now },
  exercise: String,
  weight: Number,
  reps: Number,
  distance: String,
  duration: String,
});

module.exports = mongoose.model("Workout", WorkoutSchema);
