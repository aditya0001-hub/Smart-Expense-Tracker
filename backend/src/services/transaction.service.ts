import { prisma } from './../../prisma/lib/prisma.js'
import { TransactionType } from '../../generated/prisma/enums.js'



export async function createTransactionService(data: {
    userId: number,
    amount: number,
    type: TransactionType,
    categoryId: number,
    description: string,
    date: string,
}) {

    if (!data.categoryId) {
        throw new Error("category not found ");
    }
    const category = await prisma.category.findUnique({
        where: { id: data.categoryId }
    })
    if (!category) {
        throw new Error("Category not exists")
    }
    if (data.userId !== category.userId) {
        throw new Error("Category does not belong to user")
    }
    if (data.amount <= 0) {
        throw new Error("Amount is invalid");
    }
    if (!(data.type === "INCOME" || data.type === "EXPENSE")) {
        throw new Error("Type is invalid");
    }
    const fullDate = new Date(data.date);
    const budget = await prisma.budget.findFirst({
        where: {
            userId: data.userId,
            month: fullDate.getMonth() + 1,
            year: fullDate.getFullYear(),
            categoryId: data.categoryId,
        },
    })

    if (!budget) {
        throw new Error("Budget does not exists")
    }

    const year = fullDate.getFullYear();
    const month = fullDate.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);
    if (data.type === "EXPENSE") {
        const spend = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                userId: data.userId,
                categoryId: data.categoryId,
                type: TransactionType.EXPENSE,
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        })
        const spendAmount = spend._sum.amount ?? 0;
        const afterNew = Number(spendAmount) + data.amount
        //allTransaction.amount
        //suma all Amount


        if (Number(budget.amount) < afterNew) {
            throw new Error("Budget limit exceeded");
        }
        // if (((afterNew / Number(budget.amount)) * 100)>=80) {
        //     return {message:"Approaching budget limit"};
        // }const percentage = (afterNew / budgetAmount) * 100;
        const percentage = (afterNew / Number(budget.amount)) * 100;
        if (percentage >= 80) {
            console.log({ message: "Approaching budget limit" }); // only if you want to exit
        }
    }

    const createTransaction = await prisma.transaction.create({
        data: {
            amount: data.amount,
            type: data.type,
            categoryId: data.categoryId,
            userId: data.userId,
            description: data.description,
            date: data.date,
        }
    })
    return createTransaction;



}
export async function getTransactionsService(userId: number) {
    if (!userId) {
        throw new Error("User Id invalid")
    }
    const transactions = await prisma.transaction.findMany({
        where: { userId: userId },
        include: {
            category: true,
        },
        orderBy: {
            date: "desc",
        }
    })
    return transactions;

}