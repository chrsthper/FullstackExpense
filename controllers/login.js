const express = require('express');
const User = require('../models/signUpUser');
const path = require('path');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
//const  Sib = require('sib-api-v3-sdk');
const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config()
exports.getLoginPage = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','public','views','login.html'));
};

exports.getForgetPasswordPage = (req,res)=>{
     res.sendFile(path.join(__dirname,'../','public','views','forgetpassword.html'));    
};

exports.postForgetPassword = (req,res) =>{
      const userEmail = req.body.email;

     
      let defaultClient = SibApiV3Sdk.ApiClient.instance;
      
      let apiKey = defaultClient.authentications['api-key'];
      apiKey.apiKey = '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';
      
      let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      
      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      
      sendSmtpEmail.subject = " {{params.subject}}";
      sendSmtpEmail.htmlContent = "<html><body><h1> Click on link to reset password {{params.parameter}}</h1></body></html>";
      sendSmtpEmail.sender = {"name":"Rd17Jais","email":"17vinayjaiswal@gmail.com"};
      sendSmtpEmail.to = [{"email":userEmail}],
     
      sendSmtpEmail.params = {"parameter":"link","subject":"Rd17Jaiss, Resete Password Of Expense Tracker"};
      
      apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      }, function(error) {
        console.error(error);
      });

      /*const client = Sib.ApiClient.instance
      const apikey = client.authentications['api-key']
       apikey.apikey = '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';

      const  tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
          email:'17vinayjaiswal@gmail.com',
          name:'Rd17jaisw'
      }
     const receivers = [{
           email: userEmail,
           
     }
     ]

     tranEmailApi
     .sendTransacEmail(
          {
               sender,
               to: receivers,
               subject:" Reset password of Expense Tracker ",
               textContent:'Click on link to reset password.',
              // htmlContent:"<h3>Click on link to reset password</h3>"

               
          }
     )
     .then(console.log('Email Send'))
     .catch((err) => console.log(err));
*/
       
};

exports.postValidiateLogin = async (req,res,next) =>{

       const userValidiate = {
           email: req.body.email,
           password: req.body.password
       }

       function generateWebToken(id){
                                 
        return  jwt.sign({userId : id }, '123456abcdef');

   };

   try{
         
     await User.findAll({where :{ email : userValidiate.email}})
        
          .then((user) => {
                 
            
                if(user[0].email === userValidiate.email){
                      
                     return user[0];
                }
              
              
          })
            .then((user) => {

                    bcrypt.compare(userValidiate.password, user.password , (err , result) => {

                            if(result === true){
                              return  res.status(200).json({success : true , massage : 'User loged successfully', token : generateWebToken(user.id)});
                            }
                            else{
                                 return res.status(500).json({success: false , message : 'Wrong Password'});
                            }
                    })
                  
            })
         
           .catch(err => {
                res.status(404).send('User Not Found 404');
            

           })
          }
          catch(err){
            console.log(err)
          }

};

