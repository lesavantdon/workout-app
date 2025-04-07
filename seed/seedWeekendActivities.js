const mongoose = require('mongoose');
require('dotenv').config();

const WeekendExercise = require('../be/config/models/weekendExercises');


const activities = [

  {name: 'Record Hunting', description: 'Hunting for reggae, carribbean beats, old school records'},
  {name: 'Making a YouTube Video Sketch', description: 'Plan and shoot a short YouTube video.' },
  {name: 'Go Play Chess', description: 'play chess.' },
  {name: 'Camping Excursion', description: 'camping at local camp site'},
  {name: 'Trail Hiking Excursion', description: 'Hiking major trails in SF, Mt. Diablo,  '},
  {name: 'Skating in the City Excursion', description: 'SF, OAK, NAPA, SJ, '},
  {name: 'Long Distance Bicycle Trail Riding Excursion', description: '20+ mileride,' },
  // {name: 'Ocean Side Relaxing Excursion',  description: 'Running barefoot on ocean and dunk in ocean for 15+ minutes'},
  {name: '12hrs music production, guitar chords,flute,bass,keys Etc. ', description: 'Produce music for 12+ hours'},
  {name: 'Make art 12+ hrs a day, go to new city and explore', description: ' go to sip and paint, differnt city art exhibition'},
  {name: 'Seva at Temple', description: 'Seva at gudawara Hayward, Fremont, Livermore'}, 
  {name: 'Study Charts + Forex etc.', description: 'study charts and make notes, come up with different strategies or formulas, understand structure'},
  // {name: 'Badminton or Volleyball', description: "play badminton or volleyball in club"},
  // {name: 'Oakland Yacht Club', description: "hang out at oakland yacht club"},
  {name: 'sleep in all day, lazy day', description: "lazy day, sleep in all day"},
  {name: 'Visit Marina', description: "visit marina, jack london square, berkeely "},
  {name: 'Japanese Gardens', description: "visit japanese gardens"},
  {name: 'Animal Shelter in Hayward ', description: "Go to animal shelter in Hayward"},
  // {name: 'Go to jazz club', description: "visit jazz club"}
  // {name:'movie convention', description:'go to a movie convention'},
  // {name:'music/ open mic', description:'got to open mic at san jose, etc'}



];

const seedWeekendExercise = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      
    });

    await WeekendExercise.deleteMany();
    const inserted = await WeekendExercise.insertMany(activities);
    console.log(`${inserted.length} weekend activities seeded!`);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding weekend activities seeded!', error);
    mongoose.connection.close();
  }
};

seedWeekendExercise();
