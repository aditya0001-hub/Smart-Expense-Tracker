import express from 'express'
import type { Request, Response } from 'express'
import { createTransactionService, getTransactionsService } from './../services/transaction.service.js'

export async function createTransaction(req: Request, res: Response) {
    try {
        const userId = req.user!.id;
        const { amount, type, categoryId, description, date } = req.body;

        const createTransaction = await createTransactionService(
            {
                userId: userId,
                amount: amount,
                type: type,
                categoryId: categoryId,
                description: description,
                date: date
            })

        res.status(201).json(createTransaction)
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        res.status(400).json({ message: errorMessage })
    }
}
export async function getTransactions(req: Request, res: Response) {
    try {
        const userId = req.user!.id;
        const listTransactions = await getTransactionsService(userId)
        res.status(200).json(listTransactions)
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        res.status(400).json({ message: errorMessage })
    }


}