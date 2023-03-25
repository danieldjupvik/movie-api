const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const mime = require('mime');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

const options = { customCssUrl: 'public/swagger-ui.css' };

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const type = mime.getType(req.url);
  if (type === 'text/html') {
    res.setHeader('Content-Type', 'text/css');
  }
  next();
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Export the app
module.exports = app;
