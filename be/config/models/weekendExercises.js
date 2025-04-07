const mongoose = require('mongoose');

const weekendActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // Optional description of the activity
  lastUsed: { type: String, default: null },
});

module.exports = mongoose.model('Weekend', weekendActivitySchema, 'weekend');
