export declare function getSummary(userId: number, dateFilter: {
    month?: number;
    year?: number;
    startDate?: Date;
    endDate?: Date;
}): Promise<0 | {
    totalIncome: number | import("@prisma/client-runtime-utils").Decimal;
    totalExpense: number | import("@prisma/client-runtime-utils").Decimal;
    savings: number;
}>;
export declare function getCategoryBreakdown(userId: number, dateFilter: any): Promise<{
    category: string;
    amount: number;
}[]>;
export declare function getBudgetUsage(userId: number, month: number, year: number): Promise<{
    category: any;
    budget: any;
    spent: number;
    remaining: number;
    percentUsed: number;
}[]>;
//# sourceMappingURL=analytics.service.d.ts.map