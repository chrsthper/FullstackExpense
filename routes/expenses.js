const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const uerAuthentication = require('../middlerware/auth');
const jwt = require('jsonwebtoken');


router.get('/expense-page', expenseController.getExpensesPage);
router.post('/register-expense',uerAuthentication.authentication,expenseController.postExpeses,uerAuthentication.authentication,expenseController.postInTotalExpense);
//router.post('/register-expense',uerAuthentication.authentication, expenseController.postInTotalExpense);
router.get('/expenses', uerAuthentication.authentication ,expenseController.getExpenses);
router.delete('/expenses/:id',expenseController.deleteExpense);
router.post('/decreas-exspense',uerAuthentication.authentication, expenseController.getDescreasExpense);



module.exports = router;