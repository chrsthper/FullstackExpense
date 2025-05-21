const jwt = require('jsonwebtoken');
const User = require('../models/signUpUser');

exports.authentication = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token missing or badly formatted' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, '123456abcdef');

    console.log('✔ User ID from token:', decoded.userId);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log('❌ Auth error:', error.message);
    res.status(401).json({ error: 'Authentication failed: ' + error.message });
  }
};
