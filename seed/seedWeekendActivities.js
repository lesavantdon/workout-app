const mongoose = require('mongoose');
require('dotenv').config();

const WeekendExercise = require('../be/config/models/weekendActivities');


const activities = [

  {name: 'Record Hunting', description: 'Hunting for reggae, carribbean beats, old school records'},
  {name: 'Making a YouTube Video Sketch', description: 'Plan and shoot a short YouTube video.' },
  {name: 'Camping Excursion', description: 'camping at local camp site'},
  {name: 'Trail Hiking Excursion', description: 'Hiking major trails in SF, Mt. Diablo,  '},
  {name: 'Skating in the City Excursion', description: 'SF, OAK, NAPA, SJ, '},
  {name: 'Long Distance Bicycle Trail Riding Excursion', description: '20+ mileride,' },
  {name: 'Ocean Side Relaxing Excursion',  description: 'Running barefoot on ocean and dunk in ocean for 15+ minutes'},
  {name: '12hrs music production, guitar chords Etc. ', description: 'Produce music for 12+ hours'},
  {name: 'Make art 12+ hrs a day', description: ' sketch paint make art for 12+hrs day'},
  {name: 'Seva at Temple', description: 'Seva at gudawara Hayward, Fremont, Livermore'}, 
  
  
];



const seedWeekendExercise = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      
    });

    await WeekendExercise.deleteMany();
    const inserted = await WeekendExercise.insertMany(activities);
    console.log(`${inserted.length} mental exercises seeded!`);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding mental exercises:', error);
    mongoose.connection.close();
  }
};

seedWeekendExercise();
