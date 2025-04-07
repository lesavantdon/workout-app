const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema({
  type: { type: String, default: "Yoga" }, // Yoga type, e.g., Hatha, Vinyasa
  subtype: { type: String, required: true },
  main: [
    {
      pose: { type: String, required: true }, // Pose name in English
      sanskrit: { type: String, required: true }, // Pose name in Sanskrit
      lastUsed: { type: String, default: null },
    },
  ],
});

const Yoga = mongoose.model("Yoga", yogaSchema, 'yoga');

module.exports = Yoga;
