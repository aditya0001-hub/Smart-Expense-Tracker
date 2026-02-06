import { prisma } from './../../prisma/lib/prisma.js'
import { TransactionType } from '../../generated/prisma/enums.js'
import { emitWarning } from 'node:process';


export async function getSummary(userId: number, dateFilter: { month?: number, year?: number, startDate?: Date, endDate?: Date }) {
    if (!userId) {
        throw new Error("Unauthorized user");
    }
    let startDate: Date;
    let endDate: Date;
    if (dateFilter.month && dateFilter.year) {
        startDate = new Date(dateFilter.year, dateFilter.month - 1, 1)
        endDate = new Date(dateFilter.year, dateFilter.month, 1)
    }
    else if (dateFilter.startDate && dateFilter.endDate) {
        startDate = new Date(dateFilter.startDate)
        endDate = new Date(dateFilter.endDate)
    }
    else {
        throw new Error("Either month/year or startDate/endDate must be provided");
    }
    const userIncome = await prisma.transaction.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            userId: userId,
            type: TransactionType.INCOME,
            date: {
                gte: startDate,
                lt: endDate,
            },
        },
    });
    const userExpense = await prisma.transaction.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            userId: userId,
            type: TransactionType.EXPENSE,
            date: {
                gte: startDate,
                lt: endDate,
            },
        },
    });

    if (!userIncome) {
        return 0;
    }
    if (!userExpense) {
        return 0;
    }

    const totalIncome = userIncome._sum.amount ?? 0;
    const totalExpense = userExpense._sum.amount ?? 0;

    const savings = Number(totalIncome) - Number(totalExpense);
    const fullSummary = { totalIncome, totalExpense, savings };
    return fullSummary;
 

}
// export async function getCategoryBreakdown(userId: string, dateFilter: { month?: number, year?: number, startDate?: Date, endDate?: Date }) {
//     if (!userId) {
//         throw new Error("Unauthorized user");
//     }
//     let startDate: Date;
//     let endDate: Date;
//     if (dateFilter.month && dateFilter.year) {
//         startDate = new Date(dateFilter.year, dateFilter.month - 1, 1)
//         endDate = new Date(dateFilter.year, dateFilter.month, 1)
//     }
//     else if (dateFilter.startDate && dateFilter.endDate) {
//         startDate = new Date(dateFilter.startDate)
//         endDate = new Date(dateFilter.endDate)
//     }
//     else {
//         throw new Error("Either month/year or startDate/endDate must be provided");
//     }

//     const categoryIds = await prisma.transaction.groupBy({
//         by: ['categoryId'],
//         where: {
//             userId,
//             type: TransactionType.EXPENSE,
//             date: { gte: startDate, lt: endDate }
//         },
//         _sum: { amount: true }
//     })

//     const categroyName = await prisma.category.findMany({
//         where: { id: { in: categoryIds.categoryId } }
//     })
// //  const ids=categoryIds.map((i:any)=>i.categoryId)
//  const names=categroyName.map((e:any)=>{return {[e.name]:categoryIds._sum.amount}})
//     return {names}


// }
export async function getCategoryBreakdown(userId: number, dateFilter: any) {
  if (!userId) throw new Error("Unauthorized");

  let startDate: Date;
  let endDate: Date;

  if (dateFilter.month && dateFilter.year) {
    startDate = new Date(dateFilter.year, dateFilter.month - 1, 1);
    endDate = new Date(dateFilter.year, dateFilter.month, 1);
  } else if (dateFilter.startDate && dateFilter.endDate) {
    startDate = new Date(dateFilter.startDate);
    endDate = new Date(dateFilter.endDate);
  } else {
    throw new Error("Invalid date filter");
  }

  // Group expenses by category
  const grouped = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: {
      userId,
      type: TransactionType.EXPENSE,
      date: { gte: startDate, lt: endDate }
    },
    _sum: { amount: true }
  });

  const ids = grouped.map((g:any) => g.categoryId);

  const categories = await prisma.category.findMany({
    where: { id: { in: ids } }
  });

  // Merge category names + amounts
  const result = grouped.map((g:any )=> {
    const cat = categories.find((c:any) => c.id === g.categoryId);
    return {
      category: cat?.name || "Unknown",
      amount: Number(g._sum.amount || 0)
    };
  });

  return result;
}

// export async function getBudgetUsage(userId: string, month: number, year: number) {
//     if (!userId) {
//         throw new Error("Unauthorized user");
//     }
//     const startDate = new Date(year, month - 1, 1)
//     const endDate = new Date(year, month, 1)


//     const budget = await prisma.budget.findMany({
//         where: { userId, month, year },
//         include: { category: true }
//     })
//     const expense = await prisma.transactions.groupBy({
//         by: ['categoryId'],
//         where: {
//             userId,
//             type: TransactionType.EXPENSE,
//             date: { gte: startDate, lt: endDate }
//         },
//         _sum: { amount: true }
//     })

//     const fullBudget= budget.map((val:any)=>{
//         if(val.categoryId===expense.categoryId){
//            const spent =Number( expense._sum.amount) || 0;
//            const remaining = val.amount - spent;
//            const percentUsed = (spent / budget.amount) * 100;
//            return {
//             category:val.category.name,
//             budget:val.amount,
//             spent:spent,
//             remaining:remaining,
//             percentUsed:percentUsed,
//            }
//         }
      
        
//     })

//     return fullBudget;
// }
export async function getBudgetUsage(userId: number, month: number, year: number) {
  if (!userId) throw new Error("Unauthorized");

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const budgets = await prisma.budget.findMany({
    where: { userId, month, year },
    include: { category: true }
  });

  const expenses = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: {
      userId,
      type: TransactionType.EXPENSE,
      date: { gte: startDate, lt: endDate }
    },
    _sum: { amount: true }
  });

  // Convert expenses array to map for fast lookup
  const expenseMap = new Map(
    expenses.map((e:any) => [e.categoryId, Number(e._sum.amount || 0)])
  );

  const fullBudget = budgets.map((b:any) => {
    const spent =Number( expenseMap.get(b.categoryId) || 0);
    const remaining = b.amount - spent;
    const percentUsed = b.amount > 0 ? (spent / b.amount) * 100 : 0;

    return {
      category: b.category.name,
      budget: b.amount,
      spent,
      remaining,
      percentUsed
    };
  });

  return fullBudget;
}
