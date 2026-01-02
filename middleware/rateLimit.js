const rateLimit = require('express-rate-limit');

// limit requests to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again in 15 minutes',
});

module.exports = limiter;
