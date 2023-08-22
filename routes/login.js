const express = require('express');
const loginContoller = require('../controllers/login');

const router = express.Router();

router.get('/',loginContoller.getLoginPage);
router.post('/login/validiation' , loginContoller.postValidiateLogin);




module.exports = router;