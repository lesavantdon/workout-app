const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const calisthenicsRoutes = require('./routes/calisthenics');
const cardioRoutes = require('./routes/cardio');
const strengthRoutes = require('./routes/strength');
const yogaRoutes = require('./routes/yoga');

const app = express();

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

// Sample route to test connection
app.get('/', (req, res) => {
  res.send('Backend connected to MongoDB');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
