const express = require('express');
const router = express.Router();
const forgetController = require('../controllers/forget');

router.get('/forget-password', forgetController.getForgetPasswordPage);
router.post('/forget-password', forgetController.handleForgetPassword);
router.get('/reset-password', forgetController.getResetPage);
router.post('/reset-password', forgetController.postResetPassword);

module.exports = router;
