const mongoose = require('mongoose');
const movieSchema = require('./Movie');
const watchlistSchema = require('./Watchlist');

const Movie = mongoose.model('Movie', movieSchema);
const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = { Movie, Watchlist };
