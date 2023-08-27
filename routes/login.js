const express = require('express');
const loginContoller = require('../controllers/login');
const authMiddleware = require('../middlerware/auth');
const router = express.Router();

router.get('/',loginContoller.getLoginPage);
router.post('/login/validiation' , loginContoller.postValidiateLogin);
router.get('/forget-password',loginContoller.getForgetPasswordPage);
router.post('/forget-password-called',loginContoller.postForgetPassword);
router.get('/reset-pasword-page/:id',loginContoller.getResetpasswordpage);
router.post('/forget-password-called-req/:id',loginContoller.postUpdatePasswordReq);





module.exports = router;