const express = require("express");
const { getRandomWorkoutByGenre } = require("../controllers/workoutController");

const router = express.Router();

// Define a route for getting a random workout based on the genre
router.get("/api/:workoutGenre/random", getRandomWorkoutByGenre);

module.exports = router;
