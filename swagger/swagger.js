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
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui.min.css',
  customfavIcon: '/images/swagger_fav.png',
};

// Set up Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Export the app
module.exports = app;
