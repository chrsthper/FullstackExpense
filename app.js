const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const sequelize = require('./util/database');
const { error } = require('console');
const { JSON } = require('sequelize');
const expenses = require('./models/expenses');
const expenseRoutes = require('./routes/expenses');
const loginRoutes = require('./routes/login');
const signUpRoutes = require('./routes/signUp');
const User = require('./models/signUpUser');

const port = 4000;
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public','css')));
app.use(express.static(path.join(__dirname,'public','js')));
app.use(express.static(path.join(__dirname,'public','views')));
// routers
app.use(loginRoutes);
app.use(signUpRoutes);
app.use(expenseRoutes);


app.get('/expenses' , async(req,res) => {
    try {
            const expense = await expenses.findAll();
            res.status(200).json({allExpense : expense});
    } catch (error) {
        console.log("get expense is failing" , JSON.stringify(error));
        res.status(500).json({error:error});
    }
});

app.delete('/expenses/:id', async( req, res) =>{
       
    try {
           const expenseId = req.params.id;
           await expenses.destroy({where: {id : expenseId}});
           res.sendStatus(200);
    } catch (error) {
       console.log(error)
       res.sendStatus(500).json(error);
    }
})



sequelize.sync()
.then( () => {
    app.listen( port , () => {
        console.log(`Server is Running on port ${port}`);
    })
    
})
.catch( error => {
    console.log(error);
})



