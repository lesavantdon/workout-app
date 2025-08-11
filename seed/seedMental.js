const mongoose = require('mongoose');
require('dotenv').config();

const MentalExercise = require('../be/config/models/mental');


const activities = [
  { name: 'Writing Movie Production Scripts', description: 'Develop a screenplay or story outline.' },
  { name: 'Painting/Sketching', description: 'Create a piece of art using any medium.' },
  { name: 'Sudoku', description: 'Solve Sudoku puzzles to challenge your brain.' },
  { name: 'Video Games', description: 'Play games for relaxation or skill improvement.' },
  { name: 'Reading', description: 'Read off kindle library.' },
  { name: 'Music Production/ Guitar', description: 'Compose or produce music, learn guitar.' },
  { name: 'Learn French', description: 'Practice French.' },
   { name: 'Learn Tamil/Telagu', description: 'Practice Tamil/Telagu.'},
   { name: 'Learn Japanese', description: 'Practice Japanese.'},
   { name: 'Learn Mandarin', description: 'Practice Mandarin.'},
  { name: 'Skateboarding', description: 'Spend time improving your skateboarding skills.' },
  { name: 'Blender 3D Modeling', description: 'Create 3D models or animations using Blender.' },
  { name: 'Jewelry Design + Making', description: 'Sketch or design creative jewelry pieces.' },
  { name: 'Edit YouTube Video Sketch from weekend', description: 'edit and produce short YouTube video.' },
  { name: 'Coding Problems', description: 'use CodeChef and/or Leetcode to code problems.'},
  {name: 'Study Forex Charts', description: 'Work on algorithms, math problems, develop new chart strategies for trading, trading bots etc. '},
  {name: 'Tattoo', description: 'Tattoo your leg'},
 
];


const seedMentalExercises = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      
    });

    await MentalExercise.deleteMany(); // Clear existing data
    const inserted = await MentalExercise.insertMany(activities); // Add new data
    console.log(`${inserted.length} mental exercises seeded!`);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding mental exercises:', error);
    mongoose.connection.close();
  }
};

seedMentalExercises();
 