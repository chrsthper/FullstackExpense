const Razorpay = require('razorpay');
const Order = require('../models/orders');
const User = require('../models/signUpUser');
const Expenses = require('../models/expenses');
const sequelize = require('../util/database');
const e = require('express');
const { Sequelize } = require('sequelize');
//const order = require('../models/orders');

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
            key_id : 'rzp_test_WOdOb54oqu0yCI',
            key_secret:'9HeJFU1aHoruua1oEWY1M7uq'
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
            
           })

           res.status(200).json({expensesl});
    } catch (error) {
        throw new Error(error);
    }



    
    
}