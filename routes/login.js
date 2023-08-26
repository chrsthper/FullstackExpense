const express = require('express');
const loginContoller = require('../controllers/login');

const router = express.Router();

router.get('/',loginContoller.getLoginPage);
router.post('/login/validiation' , loginContoller.postValidiateLogin);
router.get('/forget-password',loginContoller.getForgetPasswordPage);
router.post('/forget-password-called',loginContoller.postForgetPassword);




module.exports = router;