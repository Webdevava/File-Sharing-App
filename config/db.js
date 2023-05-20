require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
  // Database connection
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected successfully to the database');
      // Perform database operations here
    })
    .catch((error) => {
      console.error('Failed to connect to the database:', error);
      process.exit(1); // Exit the process with a non-zero status code upon connection failure
    });
}

module.exports = connectDB;
