 const jwt = require('jsonwebtoken');
const User = require('../models/signUpUser');

exports.authentication = (req,res,next) => {
         
             try {
                   const token = req.header('Authorization');
                    
               const user = jwt.verify(token ,'123456abcdef')
                     
                   console.log('>>>>',user.userId)
                   User.findByPk(user.userId)
                   .then((user)=> {

                         req.user = user;
                         console.log(req.user.id);

                         next();
                   })
                    
             } catch (error) {
                   console.log(error,'Middleware error');
             }
   }

   