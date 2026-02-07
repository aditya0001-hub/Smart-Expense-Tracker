import { summary, categoryBreakdown, budgetUsage } from './../controllers/analytics.controller.js';
import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();
router.use(authMiddleware);
router.post('/summary', summary);
router.post('/category-breakdown', categoryBreakdown);
router.post('/budget-usage', budgetUsage);
export default router;
