require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.MONGODB_URL;

function connectDB() {
    //Database connection 

    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected successfully to the database');
  
      // Perform database operations here
    })
    .catch((error) => {
      console.error('Failed to connect to the database:', error);
    });
    
}

module.exports = connectDB;