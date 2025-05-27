const express = require('express');
const User = require('../models/signUpUser');
const path = require('path');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const ForgetPassReq = require('../models/forgetPassReq');
const sequelize = require('../util/database');
//const  Sib = require('sib-api-v3-sdk');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const uuid = require('uuid');
const { UUIDV4 } = require('sequelize');
require('dotenv').config();
exports.getLoginPage = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','public','views','login.html'));
};


exports.postValidiateLogin = async (req, res) => {
  const { email, password } = req.body;

  function generateWebToken(id) {
    return jwt.sign({ userId: id }, '123456abcdef'); // gunakan env var di production
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
};



