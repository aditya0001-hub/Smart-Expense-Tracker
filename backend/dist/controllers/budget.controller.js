import { createOrUpdateBudget, getBudgetsService } from '../services/budget.sevices.js';
export async function createOrUpdateBudgets(req, res) {
    const { categoryId, amount, month, year } = req.body;
    const userId = req.user.id;
    try {
        const budget = await createOrUpdateBudget({ userId, categoryId, amount, month, year });
        res.status(200).json(budget);
    }
    catch (error) {
        res.status(400).json({ message: `Error occured in creation or updation of budget ${error}` });
    }
}
export async function getBudgets(req, res) {
    const userId = req.user.id;
    try {
        const budgets = await getBudgetsService(userId);
        res.status(200).json(budgets);
    }
    catch (error) {
        res.status(400).json({ message: `Error in getting budgets ${error}` });
    }
}
