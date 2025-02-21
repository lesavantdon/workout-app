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
    main: [
      'Standard push-ups',
      'Diamond push-ups',
      'Chair Pushups'
    ],
    sets: 4,
    reps: '10-15',
    
  },
  // Pull-Ups
  {
    type: 'Calisthenics',
    category: 'Shoulders',
    main: [
      'isometric hand stands'
    ],
    sets: 4,
    reps: '5-10',
    
  },
  // Squats
  {
    type: 'Calisthenics',
    category: 'Legs',
    main: [
      'Isometric squats holds',
      'Isometric calf raises',
      'Pistol squats',
    ],
    sets: 4,
    reps: '15-20',
    
  },
  // Dips
  {
    type: 'Calisthenics',
    category: 'Arms',
    main: [
      'Bench dips',
      'Straight bar dips',
      'Ring dips',
    ],
    sets: 3,
    reps: '8-12',
    r
  },
 
  // Planks
  {
    type: 'Calisthenics',
    category: 'Core',
    main: [
      'Side plank, with sand bag.',
    ],
    sets: 3,
    reps: 'Hold for 30-60 seconds',
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
