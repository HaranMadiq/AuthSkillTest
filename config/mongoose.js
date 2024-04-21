// Import the mongoose library
const mongoose = require('mongoose');
const { encode } = require('querystring'); 

// Encode the password
const password = '1234';
const encodedPassword = encodeURIComponent('1234', 'utf8'); 

// Create the MongoDB connection URL with the encoded password
const dbURI = `mongodb+srv://haran:${password}@cluster0.6va8jz3.mongodb.net/?retryWrites=true&w=majority`;


// Connect to the MongoDB server with the provided URL and options 
mongoose.connect(dbURI, {
    // Options can be added here if needed
});



// Get a reference to the default Mongoose connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;