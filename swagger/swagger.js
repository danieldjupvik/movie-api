const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

// Set up Swagger UI using CDN
const swaggerUiOptions = {
  customCss:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui.css',
  customJs:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui-bundle.js',
};
app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerUiOptions)
);

// Export the app
module.exports = app;
