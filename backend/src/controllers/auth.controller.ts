import { registerUser, loginUser } from '../services/auth.services.js'
import type { Request, Response } from 'express'

export async function register(req:Request, res:Response) {
    try {
        const { userName, userEmail, userPassword } = req.body

        const user = {
            name: userName,
            email: userEmail,
            password: userPassword
        }

        const registeredUser = await registerUser(user)

        res.status(201).json(registeredUser)
    } catch (error) {
        console.error('Error in register:', error)
        res.status(400).json({ message: error instanceof Error ? error.message : 'Registration failed' })
    }
}

export async function login(req:Request, res:Response) {
    try {
        const { userEmail, userPassword } = req.body

        const user = {
            email: userEmail,
            password: userPassword
        }

        const loggedInUser = await loginUser(user)

        res.status(200).json(loggedInUser)
    } catch (error) {
        console.error('Error in login:', error)
        res.status(401).json({ message: error instanceof Error ? error.message : 'Login failed' })
    }
}
