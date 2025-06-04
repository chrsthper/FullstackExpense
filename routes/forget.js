import express from 'express';
import {
  getForgetPasswordPage,
  handleForgetPassword,
  getResetPage,
  postResetPassword
} from '../controllers/forget.js';

const router = express.Router();

router.get('/forget-password', getForgetPasswordPage);
router.post('/forget-password', handleForgetPassword);
router.get('/reset-password', getResetPage);
router.post('/reset-password', postResetPassword);

export default router;