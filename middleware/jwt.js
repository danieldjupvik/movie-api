const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };
