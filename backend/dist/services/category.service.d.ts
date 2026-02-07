export declare function createCategoryService(data: {
    name: string;
    userId: number;
}): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
}>;
export declare function getCategoriesService(userId: number): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
}[]>;
//# sourceMappingURL=category.service.d.ts.map