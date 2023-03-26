const express = require('express');
const router = express.Router();
const { generateToken } = require('../../middleware/jwt');

router.get('/', (req, res) => {
  // Generate a new JWT token with a 1-hour expiration time
  const token = generateToken({});
  res.json({ token });
});

module.exports = router;
