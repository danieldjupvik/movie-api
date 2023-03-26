const { verifyToken } = require('./jwt');

function auth(req, res, next) {
  // Check for token in URL query and Authorization header
  const token = req.query.token;
  const authHeader = req.headers.authorization;
  const bearerToken =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

  const authToken = token || bearerToken;

  if (!authToken) {
    return res
      .status(401)
      .send(
        'Invalid or missing token, go to "/api/generate/token" to get a token and then use the token in the URL query or the Authorization header.'
      );
  }

  try {
    // Verify the token and attach it to the request object if it's valid
    const decoded = verifyToken(authToken);
    req.token = decoded;
    next();
  } catch (err) {
    // If the token is invalid, send a 401 Unauthorized response
    res.status(401).send('Invalid token');
  }
}

module.exports = auth;
