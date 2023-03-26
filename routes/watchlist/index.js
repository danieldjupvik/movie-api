const express = require('express');
const router = express.Router();
const { Watchlist } = require('../models/index');

// Add a movie to the watchlist
router.post('/', async (req, res) => {
  const { movieId } = req.body;

  try {
    const watchlist = await Watchlist.findOne({});

    if (!watchlist) {
      const newWatchlist = new Watchlist({
        movieIds: [movieId],
      });
      await newWatchlist.save();
      return res.status(200).json({ message: 'Movie added to watchlist' });
    }

    if (watchlist.movieIds.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    watchlist.movieIds.push(movieId);
    await watchlist.save();
    res.status(200).json({ message: 'Movie added to watchlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get the watchlist
router.get('/', async (req, res) => {
  try {
    const watchlist = await Watchlist.findOne();
    if (!watchlist) {
      res.status(404).json({ error: 'Watchlist not found' });
    } else {
      res.status(200).json({ watchlist });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
