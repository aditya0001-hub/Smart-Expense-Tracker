import { prisma } from '../lib/prisma.js';
export async function createOrUpdateBudget(data) {
    if (data.amount <= 0) {
        throw new Error("Invalid amount");
    }
    if (!(data.month >= 1 && data.month <= 12)) {
        throw new Error("Invalid month");
    }
    const currentYear = new Date().getFullYear();
    if (data.year <= currentYear - 1) {
        throw new Error("Invalid year");
    }
    if (!data.categoryId) {
        throw new Error("Empty category id");
    }
    const category = await prisma.category.findUnique({
        where: { id: data.categoryId } // i think categoty id will here
    });
    if (!category) {
        throw new Error("Category not exists");
    }
    if (data.userId !== category.userId) {
        throw new Error("Category does not belong to user");
    }
    const budget = await prisma.budget.findUnique({
        where: {
            userId_month_year_categoryId: {
                userId: data.userId,
                month: data.month,
                year: data.year,
                categoryId: data.categoryId
            }
        }
    });
    if (budget) {
        const amount_update = await prisma.budget.update({
            where: {
                userId_month_year_categoryId: {
                    userId: data.userId,
                    month: data.month,
                    year: data.year,
                    categoryId: data.categoryId
                }
            },
            data: {
                amount: data.amount,
            }
        });
        return amount_update;
    }
    if (!budget) {
        const createBudget = await prisma.budget.create({
            data: {
                month: data.month,
                year: data.year,
                amount: data.amount,
                userId: data.userId,
                categoryId: data.categoryId
            }
        });
        return createBudget;
    }
}
export async function getBudgetsService(userId) {
    if (!userId) {
        throw new Error("User id is empty");
    }
    const budgets = await prisma.budget.findMany({
        where: {
            userId: userId,
        },
        include: {
            category: {
                select: {
                    name: true
                },
            },
        },
        orderBy: [
            { year: 'desc' },
            { month: 'desc' }
        ]
    });
    return budgets;
}
