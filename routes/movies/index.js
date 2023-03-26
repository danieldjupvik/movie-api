const express = require('express');
const router = express.Router();
const { Movie } = require('../models/index');

router.get('/', async (req, res) => {
  try {
    // Read query parameters for filtering and sorting
    const { title, year, sortBy, order } = req.query;

    // Build the query object for filtering
    let query = {};
    if (title) query.title = new RegExp(title, 'i');
    if (year) query.year = year;

    // Determine the sorting field and order
    let sort = {};
    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    }

    // Execute the query with filtering and sorting
    const movies = await Movie.find(query).sort(sort);

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/add', async (req, res) => {
  const { title, description, year, poster, rating } = req.body;
  const movie = new Movie({ title, description, year, poster, rating });
  try {
    const savedMovie = await movie.save();
    res.status(201).json({
      status: 'Movie successfully added!',
      value: savedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while adding the movie.');
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send('Data is not found');
    }

    const { title, description, year, poster, rating } = req.body;
    movie.title = title;
    movie.description = description;
    movie.year = year;
    movie.poster = poster;
    movie.rating = rating;

    await movie.save();
    res.json('Movie updated!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({
      status: 'Movie removed successfully',
      value: movie,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
