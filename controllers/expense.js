import Expenses from '../models/expenses.js';
import Incomes from '../models/incomes.js';
import User from '../models/signUpUser.js';
import sequelize from '../util/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getExpensesPage(req, res) {
  res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'expense.html'));
}

export async function postExpeses(req, res) {
  const t = await sequelize.transaction();
  const { money, amount, description, category, date, time } = req.body;

  if (money == 1) {
    // Income
    try {
      await Incomes.create({
        amount,
        description,
        category,
        date,
        time,
        userId: req.user.id
      }, { transaction: t });

      await t.commit();
      console.log("Income Created..");
      res.status(201).json({ message: "Income created successfully" });
    } catch (err) {
      await t.rollback();
      console.log(err);
      res.status(500).json({ error: "Failed to create income" });
    }
  }

  if (money == 0) {
    // Expense
    try {
      await Expenses.create({
        amount,
        description,
        category,
        date,
        time,
        userId: req.user.id
      }, { transaction: t });

      await t.commit();
      console.log("Expense Created..");
      res.status(201).json({ message: "Expense created successfully" });
    } catch (err) {
      await t.rollback();
      console.log(err);
      res.status(500).json({ error: "Failed to create expense" });
    }
  }
}

export async function getExpenses(req, res) {
  const t = await sequelize.transaction();
  try {
    const expense = await Expenses.findAll({
      where: { userId: req.user.id },
      transaction: t
    });
    await t.commit();
    res.status(200).json({ allExpense: expense });
  } catch (error) {
    await t.rollback();
    console.log("get expense is failing", JSON.stringify(error));
    res.status(500).json({ error });
  }
}

export async function getIncomes(req, res) {
  const t = await sequelize.transaction();
  try {
    const incomes = await Incomes.findAll({
      where: { userId: req.user.id },
      transaction: t
    });
    await t.commit();
    res.status(200).json({ allIncomes: incomes });
  } catch (error) {
    await t.rollback();
    console.log("get Incomes is failing");
    res.status(500).json({ error: error.message });
  }
}

export async function getDescreasExpense(req, res) {
  const t = await sequelize.transaction();
  const amount = parseInt(req.body.amount);
  const userId = req.user.id;
  const money = req.body.select;

  try {
    const user = await User.findOne({ where: { id: userId }, transaction: t });

    if (money == 1) {
      const tIncome = +user.totalIncome - amount;
      await user.update({ totalIncome: tIncome }, { transaction: t });
    } else if (money == 0) {
      const tAmount = +user.totalExpense - amount;
      await user.update({ totalExpense: tAmount }, { transaction: t });
    }

    await t.commit();
    res.status(200).json({ message: "Balance updated" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
}

export async function deleteExpense(req, res) {
  const t = await sequelize.transaction();
  try {
    const expenseId = req.params.id;
    await Expenses.destroy({ where: { id: expenseId }, transaction: t });
    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json(error);
  }
}

export async function deleteIncome(req, res) {
  const t = await sequelize.transaction();
  try {
    const incomeId = req.params.id;
    await Incomes.destroy({ where: { id: incomeId }, transaction: t });
    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json(error);
  }
}

export async function postInTotalExpense(req, res) {
  const t = await sequelize.transaction();
  const amount = parseInt(req.body.amount);
  const select = req.body.money;
  const userId = req.user.id;

  try {
    const user = await User.findOne({ where: { id: userId }, transaction: t });

    if (select == 1) {
      const tIncome = +user.totalIncome + amount;
      await user.update({ totalIncome: tIncome }, { transaction: t });
    } else if (select == 0) {
      const tExpense = +user.totalExpense + amount;
      await user.update({ totalExpense: tExpense }, { transaction: t });
    }

    await t.commit();
    res.status(200).json({ message: "Total updated" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
}

export async function getBalance(req, res) {
  const userId = req.user.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const balance = +user.totalIncome - +user.totalExpense;
    res.status(200).json({ balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
