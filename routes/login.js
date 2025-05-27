const express = require('express');
const loginContoller = require('../controllers/login');
const authMiddleware = require('../middlerware/auth');
const router = express.Router();

router.get('/',loginContoller.getLoginPage);
router.post('/login/validiation' , loginContoller.postValidiateLogin);






module.exports = router;