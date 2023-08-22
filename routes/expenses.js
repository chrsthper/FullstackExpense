const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');


router.get('/expense-page', expenseController.getExpensesPage);
router.post('/register-expense',expenseController.postExpeses);



module.exports = router;