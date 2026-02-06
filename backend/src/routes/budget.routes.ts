import  express  from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOrUpdateBudgets, getBudgets } from "../controllers/budget.controller.js";

const router=express.Router()
router.use(authMiddleware)
router.post('/',createOrUpdateBudgets)
router.get('/',getBudgets)


export default router