const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/signUpUser');

exports.getSignUpPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/signUp.html'));
};

exports.postSignUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
