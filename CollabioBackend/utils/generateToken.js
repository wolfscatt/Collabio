const jwt = require('jsonwebtoken');

module.exports = function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};
