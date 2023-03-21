const mongoose = require('mongoose');
const movieSchema = require('./Movie');

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
