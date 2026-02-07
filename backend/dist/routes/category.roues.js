import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createCategory, getCategories } from './../controllers/category.controller.js';
const router = express.Router();
router.use(authMiddleware);
router.post('/', createCategory);
router.get('/', getCategories);
export default router;
