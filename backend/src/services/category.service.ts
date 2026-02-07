import { prisma } from '../lib/prisma.js'


export async function createCategoryService(data: { name: string, userId: number }) {
    if (data.name) {
        const createCategory = await prisma.category.create({
            data: {
                name: data.name,
                userId: data.userId,
            }
        })
        return createCategory;
    } else {
        throw new Error("Category name empty");
    }

}

export async function getCategoriesService(userId: number) {
    const categories = await prisma.category.findMany({
        where: { userId: userId }
    })

    return categories;

}