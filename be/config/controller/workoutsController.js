const Yoga = require("../models/yoga");
const Strength = require("../models/strength");
const Cardio = require("../models/cardio");
const Calisthenics = require("../models/calisthenics");

// Map workout genres to the correct model
const workoutModels = {
  yoga: Yoga,
  strength: Strength,
  cardio: Cardio,
  calisthenics: Calisthenics,
};

const getRandomWorkoutByGenre = async (req, res) => {
  try {
    const workoutGenre = req.params.workoutGenre.toLowerCase();

    if (!workoutModels[workoutGenre]) {
      return res.status(400).json({ error: `Invalid genre: ${workoutGenre}` });
    }

    const WorkoutModel = workoutModels[workoutGenre]; // Choose the correct model for the genre
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // Step 1: Find workouts that haven't been used today
    let workouts = await WorkoutModel.find({
      lastUsed: { $ne: today }, // Filter out workouts that have been used today
    });

    // Step 2: If all workouts have been used, reset the cycle
    if (workouts.length === 0) {
      // Reset the `lastUsed` field for all workouts (i.e., clear the tracking)
      await WorkoutModel.updateMany({}, { $unset: { lastUsed: "" } });

      // Fetch all workouts again since the cycle was reset
      workouts = await WorkoutModel.find({});
    }

    // Step 3: Select a random workout from the filtered list
    const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];

    // Step 4: Update the `lastUsed` field for the selected workout
    await WorkoutModel.findByIdAndUpdate(randomWorkout._id, { lastUsed: today });

    // Return the randomly selected workout
    res.json(randomWorkout);
  } catch (error) {
    console.error(`Error fetching ${req.params.workoutGenre} workouts:`, error);
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
};

module.exports = { getRandomWorkoutByGenre };
