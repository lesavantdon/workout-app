const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const calisthenicsRoutes = require('./be/config/routes/calisthenics');
const cardioRoutes = require('./be/config/routes/cardio');
const strengthRoutes = require('./be/config/routes/strength');
const yogaRoutes = require('./be/config/routes/yoga');
const authRoutes = require("./be/config/routes/auth");
const journalRoutes = require('./be/config/routes/journal');
const workoutRoutes = require("./be/config/routes/workout");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(cors({
  origin: "http://localhost:3001", // Only allow frontend to access
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
// Middleware
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

app.use('/api/calisthenics', calisthenicsRoutes);
app.use('/api/cardio', cardioRoutes);
app.use('/api/strength', strengthRoutes);
app.use('/api/yoga', yogaRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/journal', journalRoutes);
app.use("/api/workouts", workoutRoutes);

// Sample route to test connection
app.get('/', (req, res) => {
  res.send('Backend connected to MongoDB');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
