require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swagger = require('./swagger');
const cors = require('cors');
const movieRoutes = require('./routes/movies');
const jwt = require('jsonwebtoken');

const app = express();
const port = 6075;

app.use(express.json());
app.use(cors());

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

  app.get(`${baseUrl}/health`, (req, res) => {
    res.status(200).send('Server is up and running!');
  });

  app.get(`${baseUrl}/generate/token`, (req, res) => {
    // Generate a new JWT token with a 1-hour expiration time
    const token = jwt.sign({}, 'test_key', { expiresIn: '1h' });
    res.json({ token });
  });

  app.use(swagger);

  app.use(
    `${baseUrl}/movies`,
    (req, res, next) => {
      const token = req.query.token;
      try {
        // Verify the token and attach it to the request object if it's valid
        const decoded = jwt.verify(token, 'test_key');
        req.token = decoded;
        next();
      } catch (err) {
        // If the token is invalid or missing, send a 401 Unauthorized response
        res
          .status(401)
          .send(
            'Invalid or missing token, go to "/api/generate/token" to get an token and then use the token like this "/api/movies?token=[[token]]"'
          );
      }
    },
    movieRoutes
  );

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
