import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from './../utils/jwt.js'

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' })
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid auth format" })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token missing' })
    }
    // console.log("TOKEN:", token)
    try {
        
        const decoded = verifyToken(token)
//  console.log("DECODED:", decoded)

        if (typeof decoded === 'string' || !decoded) {
            return res.status(401).json({ message: 'Invalid token payload' })
        }
       
        req.user = {
            id: decoded.id,
            email: decoded.email,
        }

        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }

}     
