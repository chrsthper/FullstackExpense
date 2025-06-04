require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

// Import models
const User = require('./models/signUpUser');
const Expenses = require('./models/expenses');
const Incomes = require('./models/incomes');
const ForgetPassReq = require('./models/forgetPassReq');

// Import routes
const loginRoutes = require('./routes/login');
const signUpRoutes = require('./routes/signUp');
const expenseRoutes = require('./routes/expenses');
const forgetRoutes = require('./routes/forget');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(loginRoutes);
app.use(signUpRoutes);
app.use(expenseRoutes);
app.use(forgetRoutes);

// DB Associations
User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(Incomes);
Incomes.belongsTo(User);

User.hasMany(ForgetPassReq);
ForgetPassReq.belongsTo(User);

// Export for testing or server start
module.exports = { app, sequelize };
