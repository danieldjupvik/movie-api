const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  poster: String,
  rating: Number,
});

module.exports = movieSchema;
