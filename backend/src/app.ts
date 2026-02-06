import express from "express";
// import cors from "cors";
// import morgan from "morgan";

// Routes
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import categoryRoutes from "./routes/category.roues.js";

// Middleware
// import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// ===== Global Middlewares =====
// app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));

// ===== API Routes =====
app.use("/api/auth", authRoutes); //tested --working
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/categories", categoryRoutes);// testsed --working

// ===== Health Check =====
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Smart Expense Tracker API running " });
});

// ===== Error Middleware (LAST) =====
// app.use(errorMiddleware);

export default app;
