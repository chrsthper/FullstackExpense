const jwt = require('jsonwebtoken');
const User = require('../models/signUpUser');

exports.authentication = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token missing or badly formatted" });
  }

  const realToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(realToken, '123456abcdef');
    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
