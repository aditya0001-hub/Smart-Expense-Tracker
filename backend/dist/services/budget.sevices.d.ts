export declare function createOrUpdateBudget(data: {
    userId: number;
    categoryId: number;
    amount: number;
    month: number;
    year: number;
}): Promise<{
    year: number;
    id: number;
    createdAt: Date;
    userId: number;
    month: number;
    amount: import("@prisma/client-runtime-utils").Decimal;
    categoryId: number | null;
} | undefined>;
export declare function getBudgetsService(userId: number): Promise<({
    category: {
        name: string;
    } | null;
} & {
    year: number;
    id: number;
    createdAt: Date;
    userId: number;
    month: number;
    amount: import("@prisma/client-runtime-utils").Decimal;
    categoryId: number | null;
})[]>;
//# sourceMappingURL=budget.sevices.d.ts.map