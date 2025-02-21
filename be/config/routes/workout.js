const express = require("express");
const router = express.Router();
const Workout = require("../models/workouts");

// POST - Save a workout
router.post("/", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({ message: "Workout logged!", workout });
  } catch (err) {
    res.status(500).json({ error: "Error saving workout" });
  }
});

// GET - Fetch all workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching workouts" });
  }
});

module.exports = router;
