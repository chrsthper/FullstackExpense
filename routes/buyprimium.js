const express = require('express');
const middlewareAuth = require('../middlerware/auth');
const buyPremiumController = require('../controllers/buyPremium');
const router = express.Router();

router.get('/is-premium-user', middlewareAuth.authentication,buyPremiumController.getIsPremiumUser);
router.get('/buy-premium', middlewareAuth.authentication,buyPremiumController.getbuyPremium);
router.post('/premium-success', middlewareAuth.authentication,buyPremiumController.postPremiumSuccess);
router.get('/premium-user-leaderboard',middlewareAuth.authentication, buyPremiumController.getLeaderboard);
router.get('/download',middlewareAuth.authentication, buyPremiumController.getDowndload);
router.get('/downloadIncomes',middlewareAuth.authentication, buyPremiumController.getDowndloadIncomes);




module.exports = router;