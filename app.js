import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

import express from 'express';
import path, { dirname } from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import sequelize from './util/database.js';

import User from './models/signUpUser.js';
import Expenses from './models/expenses.js';
import Incomes from './models/incomes.js';
import ForgetPassReq from './models/forgetPassReq.js';

import loginRoutes from './routes/login.js';
import signUpRoutes from './routes/signUp.js';
import expenseRoutes from './routes/expenses.js';
import forgetRoutes from './routes/forget.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

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

export { app, sequelize };