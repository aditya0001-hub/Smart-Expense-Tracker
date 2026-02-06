# 🚀 Smart Expense & Budget Tracker Backend (Fintech-Grade)

---

## 📌 Project Overview

**Smart Expense & Budget Tracker Backend** is a production-ready financial tracking system built using **Node.js, TypeScript, PostgreSQL, Prisma, and JWT authentication**.  
It demonstrates **industry-level backend architecture, fintech business logic, and scalable database design**.

This project simulates real-world fintech backend systems used in banking and expense management platforms.

---

## ✨ Key Features

---

### 🔐 Authentication & Security
- User registration with **bcrypt password hashing**
- **JWT-based authentication**
- Protected routes using middleware
- Token verification and session handling

---

### 💰 Expense & Income Management
- Create **income and expense transactions**
- Category-based transaction tracking
- Monthly and custom date-range analytics
- **PostgreSQL indexes for optimized queries**

---

### 📊 Budget System (Fintech Logic)
- Monthly budget per category
- Composite unique constraint (**user + month + year + category**)
- Prevents duplicate budgets
- Budget validation before expense creation
- Budget analytics (spent, remaining, % used)

---

### 📈 Analytics Dashboard APIs
- Total income, expense, and savings summary
- Category-wise expense breakdown
- Budget vs actual spending comparison
- Monthly & custom date-range filters

---

## 🏗 Tech Stack

| Layer | Technology |
|--------|------------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT |
| Security | bcrypt |
| API Testing | Postman / Thunder Client |

---

## 📂 Project Structure

```txt
src/
│
├── controllers/        # HTTP request handling
├── services/            # Business logic layer
├── routes/              # API routing
├── middlewares/          # Authentication & validation middleware
├── utils/                # JWT, hashing utilities
├── prisma/               # Prisma client setup
├── app.ts                # Express configuration
└── server.ts             # Server bootstrap

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/expense-tracker-backend.git
cd expense-tracker-backend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file:

DATABASE_URL="postgresql://user:password@localhost:5432/expense_db"
JWT_SECRET="your_secret_key"
PORT=3000

4️⃣ Run Prisma Migrations
npx prisma migrate dev
npx prisma generate

5️⃣ Start the Server
npm run dev

✅ Server Running At
http://localhost:3000

🔑 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
📂 Category Routes
Method	Endpoint	Description
POST	/api/categories	Create category
GET	/api/categories	Get user categories
💳 Transaction Routes
Method	Endpoint	Description
POST	/api/transactions	Add transaction
GET	/api/transactions	List transactions
💰 Budget Routes
Method	Endpoint	Description
POST	/api/budgets	Create / Update budget
GET	/api/budgets	Get budgets
📊 Analytics Routes
Method	Endpoint	Description
GET	/api/summary	Income, Expense, Savings
GET	/api/category-breakdown	Expense per category
GET	/api/budget-usage	Budget vs Spending
🧪 Sample API Request
POST http://localhost:3000/api/transactions
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "amount": 500,
  "type": "EXPENSE",
  "categoryId": 1,
  "description": "Lunch",
  "date": "2026-02-01T12:00:00.000Z"
}

🧠 Key Fintech Concepts Implemented

Composite unique constraints for financial data integrity

Budget enforcement logic before expense creation

Monthly financial analytics using SQL aggregations

PostgreSQL optimized indexing

Secure JWT authentication

Clean layered architecture (Controller → Service → DB)

Type-safe backend with TypeScript

Scalable modular folder structure

🧩 Future Enhancements

Role-based access control (Admin/User)

Recurring transactions

Budget threshold notifications (80% warning)

GraphQL API support

Redis caching for analytics

Docker containerization

Frontend dashboard (Next.js / React)

👨‍💻 Author

Aditya Sharma
Full Stack Developer | Backend & Fintech Systems Enthusiast