import express from 'express';
import { getSignUpPage, postSignUpUser } from '../controllers/signUp.js';

const router = express.Router();

router.get('/sign-up', getSignUpPage);
router.post('/register', postSignUpUser);

export default router;