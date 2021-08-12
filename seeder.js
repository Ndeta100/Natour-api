const fs = require('fs');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: 'config.env' });

// Load models
const Tour = require('./models/tourModel');
const User=require('./models/userModel')
const Review=require('./models/reviewModel')
const DB=process.env.DATABASE

// Connect to DB
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8')
);



// Import into DB
const importData = async () => {
  try {
    await Tour.create(tours)
    await Review.create(reviews)
    
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany()
    
    
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}