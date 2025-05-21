const express = require('express');
const expenses = require('../models/expenses');
const { JSON } = require('sequelize');
const path = require('path');
const User = require('../models/signUpUser');
const jwt = require('jsonwebtoken');
const sequelize = require('../util/database');
const Incomes = require('../models/incomes');

exports.getExpensesPage = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'expense.html'));
};

exports.postExpeses = async (req, res, next) => {
  const t = await sequelize.transaction();
  const userExpense = {
    select: req.body.money,
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
    date: req.body.date,
    time: req.body.time,
  };

  console.log(userExpense);

  if (userExpense.select == 1) {
    // For income
    try {
      Incomes.create({
        amount: userExpense.amount,
        description: userExpense.description,
        category: userExpense.category,
        date: userExpense.date,
        time: userExpense.time,
        userId: req.user.id,
      }, { transaction: t })
        .then(async () => {
          await t.commit();
          console.log("Income Created..");
          res.status(201).json({ message: "Income created successfully" });
        })
        .catch(async (err) => {
          await t.rollback();
          console.log(err);
          res.status(500).json({ error: "Failed to create income" });
        });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  }

  if (userExpense.select == 0) {
    // For expense
    try {
      expenses.create({
        amount: userExpense.amount,
        description: userExpense.description,
        category: userExpense.category,
        date: userExpense.date,
        time: userExpense.time,
        userId: req.user.id,
      }, { transaction: t })
        .then(async () => {
          await t.commit();
          console.log("Expense Created..");
          res.status(201).json({ message: "Expense created successfully" });
        })
        .catch(async (err) => {
          await t.rollback();
          console.log(err);
          res.status(500).json({ error: "Failed to create expense" });
        });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  }
};

exports.getExpenses = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const expense = await expenses.findAll({ where: { userId: req.user.id }, transaction: t });
    res.status(200).json({ allExpense: expense });
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log("get expense is failing", JSON.stringify(error));
    res.status(500).json({ error: error });
  }
};

exports.getIncomes = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const incomes = await Incomes.findAll({ where: { userId: req.user.id }, transaction: t });
    res.status(200).json({ allIncomes: incomes });
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log("get Incomes is failing");
    res.status(500).json({ error: error.message });
  }
};

exports.getDescreasExpense = async (req, res) => {
  const t = await sequelize.transaction();
  const amount = parseInt(req.body.amount);
  const userId = req.user.id;
  let money = req.body.select;

  User.findOne({ where: { id: userId }, transaction: t })
    .then(async (user) => {
      if (money == 1) {
        const tIncome = +user.totalIncome - amount;
        user.update({ totalIncome: tIncome });
        console.log(tIncome);
      }
      if (money == 0) {
        const tAmount = +user.totalExpense - amount;
        user.update({ totalExpense: tAmount });
        console.log(tAmount);
      }

      await t.commit();
      res.status(200).json({ message: "Balance updated" });
    })
    .catch(async (err) => {
      await t.rollback();
      res.status(500).json({ error: err.message });
    });
};

exports.deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const expenseId = req.params.id;
    await expenses.destroy({ where: { id: expenseId }, transaction: t });
    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteIncome = async (req, res) => {
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
};

exports.postInTotalExpense = async (req, res) => {
  const t = await sequelize.transaction();
  const amount = parseInt(req.body.amount);
  const select = req.body.money;
  const userId = req.user.id;

  await User.findOne({ where: { id: userId }, transaction: t })
    .then(async (user) => {
      if (select == 1) {
        const tIncome = +user.totalIncome + amount;
        user.update({ totalIncome: tIncome });
        console.log(tIncome);
      }
      if (select == 0) {
        const tExpense = +user.totalExpense + amount;
        user.update({ totalExpense: tExpense });
        console.log(tExpense);
      }

      await t.commit();
      res.status(200).json({ message: "Total updated" });
    })
    .catch(async (err) => {
      await t.rollback();
      res.status(500).json({ error: err.message });
    });
};

exports.getBalance = async (req, res) => {
  const userId = req.user.id;
  await User.findOne({ where: { id: userId } })
    .then((user) => {
      let Balance = +user.totalIncome - +user.totalExpense;
      res.status(200).json({ balance: Balance });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
