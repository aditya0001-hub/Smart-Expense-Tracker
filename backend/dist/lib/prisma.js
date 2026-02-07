// import "dotenv/config";
// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from '../prisma/client.js'
// const connectionString = `${process.env.DATABASE_URL}`
// const adapter = new PrismaPg({ connectionString })
// const prisma = new PrismaClient({ adapter })
// export { prisma }
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export { prisma };
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        log: ["query", "error"],
    });
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
