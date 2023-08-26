const express = require('express');
const expenses = require('../models/expenses');
const { JSON } = require('sequelize');
const path = require( 'path');
const User = require('../models/signUpUser');
const jwt = require('jsonwebtoken');
const sequelize = require('../util/database');
exports.getExpensesPage = ( req,res,next) =>{

    res.status(200).sendFile(path.join(__dirname,'..','public','views','expense.html'));

};

exports.postExpeses = async (req,res,next) => {
  const t = await sequelize.transaction();
      const userExpense = {
        
         amount : req.body.amount,
         description:req.body.description,
         category: req.body.category,
         date: req.body.date,
         time:req.body.time,
         
         

      }
      
       
      expenses.create(
        {
            amount: userExpense.amount,
            description:userExpense.description,
            category:userExpense.category,
            date:userExpense.date,
            time:userExpense.time,
            userId: req.user.id
      
        },
        {transaction: t}
      )
      .then( async () => {
          await t.commit();
        console.log("Expense Created..");
        next();
         

      })
      .catch( async (err) => {
          await t.rollback();
        console.log(err);
      });

   
};

exports.getExpenses =  async (req,res,next) => {
          const t = await sequelize.transaction();
    try {
            const expense = await expenses.findAll({where :{userId: req.user.id}, transaction: t});
            res.status(200).json({allExpense : expense});

            await t.commit();
    } catch (error) {
           await t.rollback();
        console.log("get expense is failing" , JSON.stringify(error));
        res.status(500).json({error:error});
    }

}

exports.getDescreasExpense = async (req,res) => {
      const t = await sequelize.transaction();
  const amount = parseInt(req.body.amount);
   const userId = req.user.id;
   
      User.findOne({where:{id: userId},transaction: t})
      .then( async (user) => {
            const tAmount =  +user.totalExpense - amount;
         user.update({totalExpense : tAmount})
         console.log(tAmount)
         await t.commit();
      })
      .catch( async(err) => {
         await t.rollback();
          throw new Error(err);
      })
}

exports.deleteExpense =  async( req, res) =>{
  
    const t= await sequelize.transaction();

  try {

    // deleting expense 
         const expenseId = req.params.id;
         await expenses.destroy({where: {id : expenseId}, transaction: t});
         res.sendStatus(200);
         await t.commit();
  } catch (error) {
    await t.rollback();
     console.log(error)
     res.sendStatus(500).json(error);
  }
};

exports.postInTotalExpense = async (req,res) => {
        
    const t= await sequelize.transaction();
        const expense = parseInt(req.body.amount);
         const userId = req.user.id;
       
        await User.findOne({where:{id: userId}, transaction: t})
        .then( async (user)=>{
            const tExpense = +user.totalExpense + expense ;

         
          user.update({totalExpense : tExpense })
           console.log(tExpense);

          await t.commit();
            
        })
        .catch( async (err) =>{
          await t.rollback();
            throw new Error(err);
        })

        
      
}


