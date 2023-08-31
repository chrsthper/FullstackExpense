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

exports.getForgetPasswordPage = (req,res)=>{

     res.sendFile(path.join(__dirname,'../','public','views','forgetpassword.html'));  
       
            
      
};

exports.postForgetPassword = async (req,res) =>{
   
     

      const userEmail = req.body.email;

      User.findOne({where:{email: userEmail}})
      .then((user) =>{

          ForgetPassReq.create({
                isActive: true,
                userId : user.id
            })
            .then(() => {
                ForgetPassReq.findOne({where:{userId : user.id, isActive: true}})
                .then((request) => {
                    

                          
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;


let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.subject = "My {{params.subject}}";
sendSmtpEmail.htmlContent = "<html><body><h1>Click on link to reset password {{params.parameter}}</h1></body></html>";
sendSmtpEmail.sender = {"name":"Rd17Jais","email":"17vinayjaiswal@gmail.com"};
sendSmtpEmail.to = [{"email":userEmail}];

sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
sendSmtpEmail.params = {"parameter":`http://localhost:4000/reset-pasword-page/${request.id}`,"subject":"Reset Expense Tracker Password, Rd17Jaise"};

  

apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  res.status(200).json({message:"Email sent successfully."})
}, function(error) {
  console.error(error);
});




                })
                .catch((err)=>{
                    throw new Error(err);
                })

            })
            .catch((err) => {
              // res.status(404).json({message: 'User Not Found'});
              throw new Error(err);
            })
          


      })
      .catch((err) => {
           res.status(404).json({user:'InValied User' ,message:'User Not Found'});
          throw new Error(err);
      })



    
};

exports.getResetpasswordpage = async (req,res) =>{

           const requestId = req.params.id;
          await ForgetPassReq.findOne({where:{id:requestId}})
           .then( async (request) =>{
               if(request.isActive === true){
                    request.update({isActive: false});
                  
               
 //  res.sendFile(path.join(__dirname,'../','public','views','resetPage.html'));

 res.status(200).send(`
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Forget Password</title>
     <link rel="stylesheet" href="">
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
     <style>
          body{
             background-color: rgb(89, 161, 163);
          }
          .form-container{
             display: flex;
             flex-direction: column;
             max-width: 420px;
             min-height: 400px;
             margin-top: 100px;
             background-color: rgb(71, 187, 187);
             border-radius: 10px ;
             border: 2px rgb(71, 187, 187) solid;
             padding: 15px;
          }
          .formInput{
             display: flex;
             flex-direction: column;
          }
          label{
              font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
              font-size: 15px;
              font-style: oblique;
              font-weight: 600;
              color: rgb(0, 0, 0);
          }
          h3{
             font-family:'Times New Roman', Times, serif;
             color: black;
             font-style: oblique;
             font-weight: 400;
          }
 
     </style>
   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
 
 
     
 </head>
 <body>
 
     <div class="container-fluid d-flex justify-content-center">
         <div class="container d-flex justify-content-center form-container">
                <h3 style="text-align: center;">Expense Tracker</h3>
              <form action='/forget-password-called-req/${requestId}' method="post" class="formInput" >
                  
                  <label for="password">Enter Password :</label>
                  <input type="password" name="newpassword" id="password" class="form-control form-control-sm" required>
                  
                  <br>
                  <input type="submit" value="Reset Password" class="btn btn-primary" >
                  <br>
              </form>      
 
         </div>
     </div>
     
 </body>
 </html>
 
 `)

               
                  

               }
               else{
                    res.json({resetLink: false, message:" This is false Request, Try Again."});
               }
             

           })
           .catch((err)=>{
                 res.status(404).json({message: 'Request not find.'})
           })


};

exports.postUpdatePasswordReq = (req,res)=>{

       
       const { newpassword} = req.body;
       const {id} = req.params;  

        ForgetPassReq.findOne({where:{id:id}})
        .then((request) =>{
            User.findOne({where:{id: request.userId}})
            .then((user) => {
            
                bcrypt.hash(newpassword, 10 , async (err ,hash) =>{
                    user.update({password: hash})
                    .then(()=>{
                         res.status(200).json({success: true, message:"Password change successfully" });
                    })
                    
                    .catch((err) => {
                         throw new Error(err)
                    })

                })
                

            })
            .catch((err)=> {
                throw new Error(err);
            })
        })
        .catch((err)=> {
           throw new Error(err);
        })

     


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



