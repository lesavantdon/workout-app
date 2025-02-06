const mongoose = require('mongoose');
require('dotenv').config();

const MentalExercise = require('../be/config/models/mental');


const activities = [
  { name: 'Writing Books', description: 'Spend time working on a book or novel.' },
  { name: 'Writing Movie Production Scripts', description: 'Develop a screenplay or story outline.' },
  { name: 'Painting/Sketching', description: 'Create a piece of art using any medium.' },
  { name: 'Sudoku', description: 'Solve Sudoku puzzles to challenge your brain.' },
  { name: 'Video Games', description: 'Play games for relaxation or skill improvement.' },
  { name: 'Reading', description: 'Read off kindle library.' },
  { name: 'Music Production', description: 'Compose or produce music.' },
  { name: 'Learn French, Japanese or German', description: 'Practice a new language or review vocabulary.' },
  { name: 'Skateboarding', description: 'Spend time improving your skateboarding skills.' },
  { name: 'Blender 3D Modeling', description: 'Create 3D models or animations using Blender.' },
  { name: 'Jewelry Design', description: 'Sketch or design creative jewelry pieces.' },
  { name: 'Making a YouTube Video Sketch', description: 'Plan and shoot a short YouTube video.' },
  { name: 'Sketching Automobiles + 3d blender designs', description: 'Design and draw vehicle concepts.' },
  { name: 'Coding Problems', description: 'use CodeChef and/or Leetcode to code problems.'},
  {name: 'Record Hunting', description: 'Hunting for reggae, old school records'}
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
