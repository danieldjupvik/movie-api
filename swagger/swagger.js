const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

const options = {
  swaggerOptions: {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.1/swagger-ui.css',
  },
};

app.use(express.static(path.join(__dirname, 'public')));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Export the app
module.exports = app;
