import jwt from 'jsonwebtoken';

const authentication = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing or badly formatted' });
  }

  try {
    const decoded = jwt.verify(token, '123456abcdef');
    req.user = { id: decoded.userId }; // sesuaikan jika kamu menyimpan info lebih
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default { authentication };
