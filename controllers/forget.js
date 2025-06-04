import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ForgetPassReq from '../models/forgetPassReq.js';
import User from '../models/signUpUser.js';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getForgetPasswordPage(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/forgetpassword.html'));
}

export async function handleForgetPassword(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const request = await ForgetPassReq.create({
    userId: user.id,
    isActive: true,
  });

  res.redirect(`/reset-password?reqId=${request.id}`);
}

export function getResetPage(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/resetPage.html'));
}

export async function postResetPassword(req, res) {
  const { password } = req.body;
  const { reqId } = req.query;

  const request = await ForgetPassReq.findOne({ where: { id: reqId, isActive: true } });
  if (!request) return res.status(400).json({ message: 'Invalid or expired request' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.update({ password: hashedPassword }, { where: { id: request.userId } });
  await request.update({ isActive: false });

  res.status(200).json({ message: 'Password reset successful' });
}