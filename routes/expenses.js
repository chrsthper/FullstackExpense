import express from 'express';
import {
  getExpensesPage,
  postExpeses,
  postInTotalExpense,
  getExpenses,
  getIncomes,
  deleteExpense,
  deleteIncome,
  getDescreasExpense,
  getBalance
} from '../controllers/expense.js';
import uerAuthentication from '../middlerware/auth.js';

const router = express.Router();

router.get('/expense-page', getExpensesPage);
router.post(
  '/register-expense',
  uerAuthentication.authentication,
  postExpeses,
  uerAuthentication.authentication,
  postInTotalExpense
);
router.get('/expenses', uerAuthentication.authentication, getExpenses);
router.get('/incomes', uerAuthentication.authentication, getIncomes);
router.delete('/expenses/:id', uerAuthentication.authentication, deleteExpense);
router.delete('/incomes/:id', uerAuthentication.authentication, deleteIncome);
router.post('/decreas-exspense', uerAuthentication.authentication, getDescreasExpense);
router.get('/balance', uerAuthentication.authentication, getBalance);

export default router;