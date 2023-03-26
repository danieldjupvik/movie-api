const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

// Set the Swagger schemes based on the environment
if (process.env.NODE_ENV === 'prod') {
  swaggerDocument.schemes = ['https'];
} else {
  swaggerDocument.schemes = ['http'];
}

const options = {
  customfavIcon:
    'https://static1.smartbear.co/swagger/media/assets/swagger_fav.png',
};

// Serve the swagger-ui static assets
app.use(
  '/swagger',
  express.static(path.join(__dirname, 'node_modules/swagger-ui/dist'))
);

// Set up Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Export the app
module.exports = app;
