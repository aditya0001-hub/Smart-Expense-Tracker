import { prisma } from '../lib/prisma.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';
async function registerUser(userData) {
    const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
    });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await hashPassword(userData.password);
    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        }
    });
    const { password, ...safeUser } = user;
    return safeUser;
}
async function loginUser(data) {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isValid = await comparePassword(data.password, user.password);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    //token generation
    const token = generateToken({
        id: user.id,
        email: user.email
    });
    const { password, ...safeUser } = user;
    return {
        token,
        user: safeUser,
    };
}
export { registerUser, loginUser };
