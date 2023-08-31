const Razorpay = require('razorpay');
const Order = require('../models/orders');
const User = require('../models/signUpUser');
const Expenses = require('../models/expenses');
const sequelize = require('../util/database');
const e = require('express');
const { Sequelize } = require('sequelize');
const AWS = require('aws-sdk');
const incomes = require('../models/incomes');
require('dotenv').config();



exports.getIsPremiumUser = async (req,res) =>{

         const userid = req.user.id;

         await User.findOne({where:{id: userid}})
         .then((user)=>{
            if(user.isPremiumUser === true){
                  return res.status(200).json({ isPremiumUser : true, name: user.name});
            }
            else{
                   return res.status(200).json({isPremiumUser: false});
            }
         })
         .catch((err)=>{
            throw new Error(err);
         })



}


exports.getbuyPremium = async (req,res) => {
    try {
          var rzp = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
          })

          const amount = 1000;

          rzp.orders.create({amount, currency:"INR"}, (err, order) =>{
                if(err){
                     throw new Error(err)
                }
                  console.log(order.id);
                Order.create({orderId: order.id, status:'PENDING'})
                .then(() =>{
                    return res.status(201).json({order, key_id: rzp.key_id});
                })
                .catch((err)=>{
                       throw new Error(err)
                })
            
                
          })

        
    } catch (error) {
        console.log(error,"burPremium Err");
    }

};


exports.postPremiumSuccess =  async (req,res)=>{
       
     const {payment_id, order_id} = req.body;
    await Order.findOne({where:{ orderId: order_id}})
     .then( async ( order) => {
       await  order.update({paymentId: payment_id, status:"SUCCESSFUL", userId: req.user.id})
        .then( async ()=>{

           await User.findOne({where:{ id: req.user.id}})
            .then((user) =>{

                user.update({ isPremiumUser : true})
                .then(()=> {
                     return res.status(202).json({success: true, message: 'Transaction Successful'});
                })
                .catch((err) =>{
                     throw new Error(err);
                })
            })
            .catch((err) => {
                console.log(err)
            })

           
        })
        .catch(err => {
            throw new Error(err);
        })
     })
     .catch((err)=>{
        throw new Error(err);
     })
      
};

exports.getLeaderboard = async (req,res)=>{

    try {
           const expensesl = await User.findAll({
              attributes : [ 'id','name','totalExpense'],
            
           });

           res.status(200).json({expensesl});
    } catch (error) {
        throw new Error(error);
    }

    
    
};



function uploadToS3(data , fileName){
    const BUCKET_NAME = process.env. BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;


    let s3Bucket = new AWS.S3({

       accessKeyId :IAM_USER_KEY,
       secretAccessKey : IAM_USER_SECRET,
      // bucket:BUCKET_NAME
    });

    
         const params = {
             Bucket : BUCKET_NAME,
             Key:  fileName,
             Body: data,
             ACL : 'public-read'
         }
  
          return new Promise( (res ,rej ) =>{
                  
            s3Bucket.upload(params,  (err, s3response) =>{
                if(err){

                    console.log("Somthing WentWrong..",err)
                    rej(err);

                }
                else{
                  console.log(s3response.Location);  
                     res(s3response.Location)
                }
          })
 
          })
       
    


};

exports.getDowndload = async (req,res) =>{
     
   

       /////
       
       const userId = req.user.id;
      await Expenses.findAll({where:{ userId: userId}})
      .then(async (expenses)=>{


         const stringifiedExpenses = JSON.stringify(expenses);
         const fileName =`Expenses${userId}/${new Date()}.txt`;
        
          let Url = await uploadToS3(stringifiedExpenses, fileName);
   

         res.status(200).json({ success:true , url: Url});

      })
      .catch((err) =>{
        console.log(err)
      })


  
            

};

exports.getDowndloadIncomes = async (req,res) =>{
     
   

    /////
    
    const userId = req.user.id;
   await incomes.findAll({where:{ userId: userId}})
   .then(async (incomes)=>{


      const stringifiedExpenses = JSON.stringify(incomes);
      const fileName =`Incomes${userId}/${new Date()}.txt`;
     
       let Url = await uploadToS3(stringifiedExpenses, fileName);


      res.status(200).json({ success:true , url: Url});

   })
   .catch((err) =>{
     console.log(err)
   })



         

};