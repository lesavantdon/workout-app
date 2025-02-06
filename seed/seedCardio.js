const mongoose = require('mongoose');
require('dotenv').config(); 
const Cardio = require('../be/config/models/cardio'); // Correct model path

// Standard Warm-Up
const standardWarmup = [
  "bicycle ride to local library/ coffee shop",
];

// HIIT Workouts
const hiitWorkouts = [
  {
    type: 'Cardio',
    category: 'HIIT',
    warmup: standardWarmup,
    main: [
      'Hill climb sprints',
    ],
  },
  {
    type: 'Cardio',
    category: 'HIIT',
    warmup: standardWarmup,
    main: [
      '100-yard dashes: 8x all-out sprints',
    ],
  },
  {
    type: 'Cardio',
    category: 'HIIT',
    warmup: standardWarmup,
    main: [
      'Stair sprints',
    ],
  },
  {
    type: 'Cardio',
    category: 'HIIT',
    warmup: standardWarmup,
    main: [
      'Bike sprints',
    ],
  },
];


const aerobicWorkouts = [
  {
    type: 'Cardio',
    category: 'Aerobic',
    warmup: standardWarmup,
    main: ['Jog'],
  },
  {
    type: 'Cardio',
    category: 'Aerobic',
    warmup: standardWarmup,
    main: ['Bicycle'],
  },
  {
    type: 'Cardio',
    category: 'Aerobic',
    warmup: standardWarmup,
    main: ['Hiking'],
  },
  {
    type: 'Cardio',
    category: 'Aerobic',
    warmup: standardWarmup,
    main: ['Skateboarding'],
  },
];


const cardioWorkouts = [...hiitWorkouts, ...aerobicWorkouts];

// Seed Cardio Function//
const seedCardio = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Use your .env connection string//
    console.log('Connected to MongoDB');

    await Cardio.deleteMany({ type: 'Cardio' }); // Corrected to use the Cardio model//
    console.log('Cleared old Cardio data');

    await Cardio.insertMany(cardioWorkouts); // Insert new Cardio data//
    console.log('Cardio workouts seeded successfully!');

    mongoose.disconnect(); // Close the connection//
  } catch (error) {
    console.error('Error seeding cardio workouts:', error);
    mongoose.disconnect();
  }
};

seedCardio();
