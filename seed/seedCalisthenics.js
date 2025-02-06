const mongoose = require('mongoose');
require('dotenv').config();
const Calisthenics = require('../be/config/models/calisthenics'); // Correct path

// Define Warm-Up
const standardWarmup = [
  'bicycle ride to local library/ cafe' 
];

// Define Calisthenics Workouts
const calisthenicsWorkouts = [
  // Push-Ups
  {
    type: 'Calisthenics',
    category:'Chest',
    warmup: standardWarmup,
    main: [
      'Standard push-ups',
      'Diamond push-ups',
      'Chair Pushups'
    ],
    sets: 4,
    reps: '10-15',
    restPeriod: '30-60 seconds',
  },
  // Pull-Ups
  {
    type: 'Calisthenics',
    category: 'Shoulders',
    warmup: standardWarmup,
    main: [
      'isometric hand stands'
    ],
    sets: 4,
    reps: '5-10',
    restPeriod: '60 seconds',
  },
  // Squats
  {
    type: 'Calisthenics',
    category: 'Legs',
    warmup: standardWarmup,
    main: [
      'Isometric squats holds',
      'Isometric calf raises',
      'Pistol squats',
    ],
    sets: 4,
    reps: '15-20',
    restPeriod: '30-60 seconds',
  },
  // Dips
  {
    type: 'Calisthenics',
    category: 'Arms',
    warmup: standardWarmup,
    main: [
      'Bench dips',
      'Straight bar dips',
      'Ring dips',
    ],
    sets: 3,
    reps: '8-12',
    restPeriod: '45-60 seconds',
  },
 
  // Planks
  {
    type: 'Calisthenics',
    category: 'Core',
    warmup: standardWarmup,
    main: [
      'Side plank, with sand bag.',
    ],
    sets: 3,
    reps: 'Hold for 30-60 seconds',
    restPeriod: '30 seconds',
  },
];

// Seed Calisthenics Function
const seedCalisthenics = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Your MongoDB connection string
    console.log('Connected to MongoDB');

    await Calisthenics.deleteMany({ type: 'Calisthenics' }); // Delete old data
    console.log('Cleared old Calisthenics data');

    await Calisthenics.insertMany(calisthenicsWorkouts); // Insert new data
    console.log('Calisthenics workouts seeded successfully!');

    mongoose.disconnect(); // Disconnect after seeding
  } catch (error) {
    console.error('Error seeding Calisthenics workouts:', error);
    mongoose.disconnect();
  }
};

seedCalisthenics();
