const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this is called at the top
const calisthenicsRoutes = require('./be/config/routes/calisthenics');
const cardioRoutes = require('./be/config/routes/cardio');
const strengthRoutes = require('./be/config/routes/strength');
const yogaRoutes = require('./be/config/routes/yoga');
const journalRoutes = require('./be/config/routes/journal');
const workoutRoutes = require("./be/config/routes/workout");
const mentalRoutes = require("./be/config/routes/mental");
const weekendExercises =  require("./be/config/routes/weekendExercises");


const cors = require("cors");
const app = express();

// CORS configuration: dynamically set origin from environment variable
const allowedOrigins = [
  process.env.LOCAL_FRONTEND_URL,   // Local development frontend URL (set in .env)
  process.env.PROD_FRONTEND_URL,    // Frontend URL for Vercel (set in .env)
  process.env.BACKEND_URL,          // Backend URL for Render (set in .env)
  process.env.REACT_APP_API_URL,
  
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('Origin:', origin);  // Log the incoming origin for debugging
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Enable CORS with the configured options
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {

})
.then(() => {
  console.log('MongoDB Connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit the process if MongoDB connection fails
});

// Routes
app.use('/api/calisthenics', calisthenicsRoutes);
app.use('/api/cardio', cardioRoutes);
app.use('/api/strength', strengthRoutes);
app.use('/api/yoga', yogaRoutes);
app.use('/api/journal', journalRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/mental", mentalRoutes);
app.use('/api/weekendExercises', weekendExercises);

// Sample route to test connection
app.get('/', (req, res) => {
  res.send('Backend connected to MongoDB');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
