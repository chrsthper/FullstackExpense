require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

// Import models
const User = require('./models/signUpUser');
const expenses = require('./models/expenses');
const Incomes = require('./models/incomes');
const ForgetPassReq = require('./models/forgetPassReq');

// Import routes
const loginRoutes = require('./routes/login');
const signUpRoutes = require('./routes/signUp');
const expenseRoutes = require('./routes/expenses');
const forgetRoutes = require('./routes/forget');

const app = express();
const port = process.env.PORT || 4000;

// Middleware - harus diletakkan sebelum routes
app.use(express.json()); // untuk parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // untuk parsing form data

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use(loginRoutes);
app.use(signUpRoutes);
app.use(expenseRoutes);
app.use(forgetRoutes); // <- letakkan setelah express.json()

// Associations
User.hasMany(expenses);
expenses.belongsTo(User);

User.hasMany(Incomes);
Incomes.belongsTo(User);

User.hasMany(ForgetPassReq);
ForgetPassReq.belongsTo(User);

// DB Sync & Start Server
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is Running on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
