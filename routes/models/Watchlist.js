const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  movieIds: [{ type: String, required: true }],
});

module.exports = watchlistSchema;
