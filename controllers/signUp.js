const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/signUpUser');

exports.getSignUpPage = ( req,res,next) => {
    res.status(200).sendFile(path.join(__dirname,'..','public','views','signUp.html'));

};
exports.postSignUpUser = (req,res,next) => {
      
       const newUser = {
           name : req.body.name,
           email : req.body.email,
           password : req.body.password
       }
  // using user model
  try {
    bcrypt.hash( newUser.password , 10 , async (err , hash) => {
      User.create({
        name : newUser.name,
        email: newUser.email,
        password: hash
     })
     .then( () => {
  
      res.send('You Sign Successfully.. Go back login');
       console.log( ' New User Sign Up now..');
    })
    .catch( err => {
      res.status(200).send("Email Already exist, use different email");
     console.log('New user Sign Up Error',err);
    });
    })
    
  } catch (error) {
    console.log(error);
  }
     
      


};