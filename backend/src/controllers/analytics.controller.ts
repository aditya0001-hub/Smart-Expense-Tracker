import type { Request, Response } from "express";
import { getSummary, getCategoryBreakdown, getBudgetUsage } from './../services/analytics.service.js'

export async function summary(req: Request, res: Response) {
     const userId = req.user!.id
    if(!userId){
    res.status(401).json({message:"Unauthorized user"})
 }
  
    const { month, year, startDate, endDate } = req.body;


 
    if (!year && !month) {
        res.status(400).json({ message: "Empty year and month" })
    }
    if (!month && year) {
        res.status(400).json({ message: "Empty month" })
    }
    if (!year && month) {
        res.status(400).json({ message: "Empty year" })
    }
    if (startDate >= endDate) {
        res.status(400).json({ message: "Invalid start date and end date" })
    }
    const dateFilter = month ? { month, year } : { startDate, endDate };
    // const dateFilter = {month,year}
    try {
        const summaryData = await getSummary(userId, dateFilter);
        res.status(200).json(summaryData)
    }
    catch (error) {
        res.status(500).json({ message: `error in summary${error}` })
    }
}
export async function categoryBreakdown(req: Request, res: Response) {
    const userId = req.user!.id;
    if(!userId){
    res.status(401).json({message:"Unauthorized user"})
 }
    const { month, year, startDate, endDate } = req.body;
    if (!year && !month) {
        res.status(400).json({ message: "Empty year and month" })
    }
    if (!month && year) {
        res.status(400).json({ message: "Empty month" })
    }
    if (!year && month) {
        res.status(400).json({ message: "Empty year" })
    }
    if (startDate >= endDate) {
        res.status(400).json({ message: "Invalid start date and end date" })
    }
    const dateFilter = month ? { month, year } : { startDate, endDate };
    // const dateFilter ={month,year};
    try {
        const categoryWiseData = await getCategoryBreakdown(userId,dateFilter);
        res.status(200).json(categoryWiseData);
    }
    catch (error) {
        res.status(500).json({ message: `error in category breakdown${error}` });
    }

}
export async function budgetUsage(req: Request, res: Response) {
    const userId = req.user!.id;
    if(!userId){
    res.status(401).json({message:"Unauthorized user"})
 }
     const { month,year} = req.body;
 
    if (!year && !month) {
        res.status(400).json({ message: "Empty year and month" })
    }
   
    try {
        const budgetData = await getBudgetUsage(userId,month,year)
        res.status(200).json(budgetData)
    }
    catch (error) {
        res.status(500).json({ message: `error in budget usage${error}` })
    }

}