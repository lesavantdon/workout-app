const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Yoga type, e.g., Hatha, Vinyasa
  main: [
    {
      pose: { type: String, required: true }, // Pose name in English
      sanskrit: { type: String, required: true }, // Pose name in Sanskrit
    },
  ],
});

const Yoga = mongoose.model("Yoga", yogaSchema, 'Yoga');

module.exports = Yoga;
