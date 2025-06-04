import User from '../models/signUpUser.js';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getLoginPage(req, res) {
  res.sendFile(path.join(__dirname, '../', 'public', 'views', 'login.html'));
}

export async function postValidiateLogin(req, res) {
  const { email, password } = req.body;

  function generateWebToken(id) {
    return jwt.sign({ userId: id }, '123456abcdef');
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Wrong password' });
    }

    const token = generateWebToken(user.id);
    return res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}