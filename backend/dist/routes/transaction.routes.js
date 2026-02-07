import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createTransaction, getTransactions } from './../controllers/transaction.controller.js';
const router = express.Router();
router.use(authMiddleware);
router.post('/', createTransaction);
router.get('/', getTransactions);
export default router;
