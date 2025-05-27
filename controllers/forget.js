const path = require('path');
const User = require('../models/signUpUser');
const ForgetPassReq = require('../models/forgetPassReq');
const bcrypt = require('bcrypt');

exports.getForgetPasswordPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/forgetPassword.html'));
};

exports.handleForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Email tidak ditemukan' });
    }

    const reqRecord = await ForgetPassReq.create({
      isActive: true,
      userId: user.id
    });

    return res.status(200).json({
      success: true,
      redirectUrl: `/reset-password?reqId=${reqRecord.id}`
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getResetPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/resetPage.html'));
};

exports.postResetPassword = async (req, res) => {
  const { reqId, newPassword } = req.body;

  try {
    const request = await ForgetPassReq.findOne({ where: { id: reqId, isActive: true } });
    if (!request) {
      return res.status(400).json({ success: false, message: 'Invalid or expired request' });
    }

    const user = await User.findOne({ where: { id: request.userId } });

    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashed });
    await request.update({ isActive: false });

    return res.status(200).json({ success: true, message: 'Password berhasil diubah' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
