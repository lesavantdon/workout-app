const mongoose = require('mongoose');
require('dotenv').config();
const Strength = require('../be/config/models/strength'); // Correct model path

// Standard Warm-Up for Strength
const standardWarmup = [
 "bicycle ride to local library/ coffee shop",
];

// Chest Workouts
const chestWorkouts = [
  {
    type: 'Strength',
    category: 'Chest',
    warmup: standardWarmup,
    main: [
      'Incline bench press: 4 sets of 8-10 reps',
      'Decline bench press: 4 sets of 8-10 reps',
    ],
  },
];

// Back Workouts
const backWorkouts = [
  {
    type: 'Strength',
    category: 'Back',
    warmup: standardWarmup,
    main: [
      'Bent-over rows: 4 sets of 8-10 reps',
      'Deadlifts: 4 sets of 6-8 reps',
      'T-bar row: 3 sets of 10-12 reps',
    ],
  },
];

// Arms Workouts
const armsWorkouts = [
  {
    type: 'Strength',
    category: 'Arms/Abs',
    warmup: standardWarmup,
    main: [
      'Curls (Barbell or Dumbbell): 4 sets of 10-12 reps',
      'Tricep dips: 3 sets of 12-15 reps',
      'Overhead tricep extension: 3 sets of 12 reps',
      'Decline Bench',
      'Weighted Decline Chin Ups',
      'Weighted/ Sand Bag; leg raises',
    ],
  },
];

// Legs Workouts
const legsWorkouts = [
  {
    type: 'Strength',
    category: 'Legs',
    warmup: standardWarmup,
    main: [
      'Squats: 4 sets of 8-10 reps',
      'Lunges: 3 sets of 12 reps each leg',
      'Toe Raises',
    ],
  },
];

// Shoulders Workouts
const shouldersWorkouts = [
  {
    type: 'Strength',
    category: 'Shoulders',
    warmup: standardWarmup,
    main: [
      'Overhead press: 4 sets of 8-10 reps',
      'Lateral raises: 3 sets of 12 reps',
      'Front raises: 3 sets of 12 reps',
      'Shrugs: 4 sets of 10-12 reps',
    ],
  },
];

// Combine All Strength Workouts
const allStrengthWorkouts = [
  ...chestWorkouts,
  ...backWorkouts,
  ...armsWorkouts,
  ...legsWorkouts,
  ...shouldersWorkouts,
];

// Seed Strength Function
const seedStrength = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Use your .env connection string
    console.log('Connected to MongoDB');

    await Strength.deleteMany({ type: 'Strength' }); // Clears old strength data
    console.log('Cleared old Strength data');

    await Strength.insertMany(allStrengthWorkouts); // Inserts new strength data
    console.log('Strength workouts seeded successfully!');

    mongoose.disconnect(); // Disconnect after seeding
  } catch (error) {
    console.error('Error seeding strength workouts:', error);
    mongoose.disconnect();
  }
};

seedStrength();
