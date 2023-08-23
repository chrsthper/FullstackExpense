const express = require('express');
const expenses = require('../models/expenses');
const { JSON } = require('sequelize');
const path = require( 'path')
exports.getExpensesPage = ( req,res,next) =>{

    res.status(200).sendFile(path.join(__dirname,'..','public','views','expense.html'));

};

exports.postExpeses = (req,res,next) => {
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
      
        }
      )
      .then( () => {
  
        console.log("Expense Created..");
         

      })
      .catch(err => {
        console.log(err);
      });

};

exports.getExpenses =  async (req,res,next) => {
  
    try {
            const expense = await expenses.findAll({where :{userId: req.user.id}});
            res.status(200).json({allExpense : expense});
    } catch (error) {
        console.log("get expense is failing" , JSON.stringify(error));
        res.status(500).json({error:error});
    }

}

exports.deleteExpense =  async( req, res) =>{
       
  try {
         const expenseId = req.params.id;
         await expenses.destroy({where: {id : expenseId}});
         res.sendStatus(200);
  } catch (error) {
     console.log(error)
     res.sendStatus(500).json(error);
  }
};





