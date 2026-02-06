import { createCategoryService, getCategoriesService } from './../services/category.service.js'
import type { Request, Response } from 'express'
export async function createCategory(req: Request, res: Response) {
    const { name } = req.body
  
    const userId = Number(req.user!.id)
    console.log(`${userId} is userrid and name ${name}`)


    try {
        const createdCategory = await createCategoryService({ name: name, userId: userId })
        res.status(201).json(createdCategory)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred in category'
        res.status(400).json({ message: errorMessage })
    }

}
export async function getCategories(req: Request, res: Response) {
     const userId = Number(req.user!.id)
    try {
        const listCategory = await getCategoriesService(userId)
        res.status(200).json(listCategory)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        res.status(400).json({ message: errorMessage })
    }

}