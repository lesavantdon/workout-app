const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');

// Get all journal entries (to display on frontend)
router.get('/journal', async (req, res) => {
  try {
    const journalEntries = await Journal.find().sort({ date: -1 }); // Sort by date, most recent first
    res.json(journalEntries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).send("Server error");
  }
});

// Create a new journal entry (when a user logs their workout)
router.post('/journal', async (req, res) => {
  try {
    const { workoutType, category, warmup, main, notes } = req.body;

    // Create a new journal entry document
    const newJournalEntry = new Journal({
      workoutType,
      category,
      warmup,
      main,
      notes,
    });

    // Save to the database
    await newJournalEntry.save();
    res.status(201).json(newJournalEntry); // Respond with the created journal entry
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
