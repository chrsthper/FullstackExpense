const express = require('express');
const expenses = require('../models/expenses');
const { JSON } = require('sequelize');

exports.getExpensesPage = ( req,res,next) =>{

    res.status(200).sendFile(path.join(__dirname,'public','views','index.html'));

}

exports.postExpeses = (req,res,next) => {
      const userExpense = {
         amount : req.body.amount,
         description:req.body.description,
         category: req.body.category,
         date: req.body.date,
         time:req.body.time

      }

      expenses.create(
        {
            amount: userExpense.amount,
            description:userExpense.description,
            category:userExpense.category,
            date:userExpense.date,
            time:userExpense.time
        }
      )
      .then( () => {
  
        console.log("Expense Created..");
         

      })
      .catch(err => {
        console.log(err);
      });

};





