require('dotenv').config();
const express = require('express');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const swagger = require('./swagger/swagger');
const movieRoutes = require('./routes/movies');
const limiter = require('./middleware/rateLimit');
const tokenRoutes = require('./routes/token');
const healthRoutes = require('./routes/health');
const watchlistRoutes = require('./routes/watchlist');
const hideVProperty = require('./middleware/hideVProperty');

const app = express();
const port = 6075;

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         'img-src': ["'self'", 'data:', 'static1.smartbear.co'],
//         'style-src': ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
//       },
//     },
//   })
// );
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(hideVProperty);

const baseUrl = '/api';
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@hobby.4johwy7.mongodb.net/movie_db?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

db.once('open', () => {
  console.log('Connected to MongoDB database!');
  app.use(swagger);
  app.use(`${baseUrl}/health`, healthRoutes);
  app.use(`${baseUrl}/generate/token`, tokenRoutes);
  app.use(`${baseUrl}/movies`, authMiddleware, movieRoutes);
  app.use(`${baseUrl}/watchlist`, authMiddleware, watchlistRoutes);

  // Catch 404 errors
  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

  // Centralized error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  });

  // Log errors
  app.use((err, req, res, next) => {
    console.error(err);
    next(err);
  });

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
