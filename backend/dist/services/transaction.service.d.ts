import { TransactionType } from '../../generated/prisma/enums.js';
export declare function createTransactionService(data: {
    userId: number;
    amount: number;
    type: TransactionType;
    categoryId: number;
    description: string;
    date: string;
}): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    amount: import("@prisma/client-runtime-utils").Decimal;
    categoryId: number;
    type: TransactionType;
    description: string | null;
    date: Date;
}>;
export declare function getTransactionsService(userId: number): Promise<({
    category: {
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
    };
} & {
    id: number;
    createdAt: Date;
    userId: number;
    amount: import("@prisma/client-runtime-utils").Decimal;
    categoryId: number;
    type: TransactionType;
    description: string | null;
    date: Date;
})[]>;
//# sourceMappingURL=transaction.service.d.ts.map