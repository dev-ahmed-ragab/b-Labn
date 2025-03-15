const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // التحقق من أن المستخدم هو إداري
    // if (decoded.role !== 'admin') {
    //   return res.status(403).json({ message: 'Access denied. Admins only.' });
    // }

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res
      .status(400)
      .json({ message: 'Invalid token.', error: error.message });
  }
};

module.exports = authMiddleware;
