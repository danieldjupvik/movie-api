const express = require('express');
const router = express.Router();
const Movie = require('../models/index');

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API for managing movies
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     description: Returns a list of movies with their id, title and release year
 *     tags:
 *      - Movies
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         description: API authorization token
 *         schema:
 *           type: string
 */

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().select('_id title year');
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     description: Returns a single movie object by ID
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the movie to retrieve
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 */

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

/**
 * @swagger
 * /movies/add:
 *   post:
 *     summary: Add a new movie to the database
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 */

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

/**
 * @swagger
 * /movies/update/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the movie to update
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 */

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

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Delete a movie by its ID from the database.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the movie to delete.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *     security:
 *       - bearerAuth: []
 */

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
