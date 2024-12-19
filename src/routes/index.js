import express from 'express';
import users from './users.js';
import expense from './expense.js';
const router = express.Router();

router.use('/users',users)
router.use('/expense',expense)
export default router;