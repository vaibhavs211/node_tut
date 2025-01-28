const mongoose = require('mongoose');

// Define mongoDB URL
const mongoURL = "mongodb://localhost:27017/hotels";

// Setup mongoDB connection
mongoose.connect(mongoURL, { });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected');
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

db.on('error', () => {
    console.log('MongoDB error');
})

// Export DB connection
module.exports = db;

