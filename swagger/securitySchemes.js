const securitySchemes = {
  TokenAuth: {
    type: 'apiKey',
    in: 'query',
    name: 'token',
    description: 'API authorization token',
  },
};

module.exports = securitySchemes;
