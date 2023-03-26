const rateLimit = require('express-rate-limit');

// limit requests to 100 requests per hour
const limiter = rateLimit({
  windowMs: 1000, // 1 hour
  max: 2,
  message: 'Too many requests from this IP, please try again in an hour',
});

module.exports = limiter;
