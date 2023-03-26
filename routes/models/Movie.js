const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    year: Number,
    poster: String,
    rating: Number,
  },
  { id: false }
);

movieSchema.virtual('movieId').get(function () {
  return this._id;
});

movieSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

module.exports = movieSchema;
