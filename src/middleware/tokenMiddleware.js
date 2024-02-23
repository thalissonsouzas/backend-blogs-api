const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const secret = process.env.JWT_SECRET || 'seusecretdetoken';
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const tooken = token.split(' ')[1];
    const decoded = jwt.verify(tooken, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateToken,
};