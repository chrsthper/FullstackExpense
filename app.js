const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database');
const { error } = require('console');
const { JSON, Association } = require('sequelize');
const expenses = require('./models/expenses');
const Incomes = require('./models/incomes')

const expenseRoutes = require('./routes/expenses');
const loginRoutes = require('./routes/login');
const signUpRoutes = require('./routes/signUp');
const User = require('./models/signUpUser');
const orders = require('./models/orders');
const ForgetPassReq = require('./models/forgetPassReq');
const premiumRouter = require('./routes/buyprimium');

const port = process.env.PORT || 4000;
const app = express();



app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public','css')));
app.use(express.static(path.join(__dirname,'public','js')));
app.use(express.static(path.join(__dirname,'public','views')));
// routers
app.use(loginRoutes);
app.use(signUpRoutes);
app.use(expenseRoutes);
app.use(premiumRouter);


// Associations 
User.hasMany(expenses);
expenses.belongsTo(User);
User.hasMany(Incomes);
Incomes.belongsTo(User)

User.hasMany(orders);
orders.belongsTo(User);
User.hasMany(ForgetPassReq);
ForgetPassReq.belongsTo(User);




sequelize.sync()
.then( () => {
    app.listen( port , () => {
        console.log(`Server is Running on port ${port}`);
    })
    
})
.catch( error => {
    console.log(error);
});



