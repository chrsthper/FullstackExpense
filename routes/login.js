import express from 'express';
import { getLoginPage, postValidiateLogin } from '../controllers/login.js';

const router = express.Router();

router.get('/', getLoginPage);
router.post('/login/validiation', postValidiateLogin);

export default router;