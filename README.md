🚀 Smart Expense & Budget Tracker Backend (Fintech-Grade)

A production-ready financial tracking backend built with Node.js, TypeScript, PostgreSQL, Prisma, and JWT authentication.
This project demonstrates industry-level backend architecture, database modeling, and financial business logic enforcement.

📌 Features
✅ Authentication & Security

User registration with bcrypt password hashing

JWT-based authentication

Protected routes using middleware

Token verification & user session handling

💰 Expense & Income Management

Create income and expense transactions

Category-based transaction tracking

Monthly and custom date-range analytics

PostgreSQL optimized indexes for fast queries

📊 Budget System (Fintech Logic)

Monthly budget per category

Composite unique constraint (user + month + year + category)

Prevents duplicate budgets

Budget enforcement before adding expense

Budget usage analytics (spent, remaining, % used)

📈 Analytics Dashboard APIs

Total income, expense, and savings summary

Category-wise expense breakdown

Budget vs actual spend comparison

Monthly and custom date-range filters

🏗 Tech Stack
Layer	Technology
Language	TypeScript
Runtime	Node.js
Framework	Express.js
Database	PostgreSQL
ORM	Prisma
Auth	JWT
Security	bcrypt
API Testing	REST Client / Thunder Client / Postman
📂 Project Structure
src/
│
├── controllers/       # Request handling (HTTP layer)
├── services/           # Business logic
├── routes/             # API route mapping
├── middlewares/         # Auth middleware
├── utils/               # JWT, hashing utilities
├── prisma/              # Prisma client
├── app.ts               # Express app setup
└── server.ts            # Server bootstrap

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/expense-tracker-backend.git
cd expense-tracker-backend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create .env file:

DATABASE_URL="postgresql://user:password@localhost:5432/expense_db"
JWT_SECRET="your_secret_key"
PORT=3000

4️⃣ Run Prisma
npx prisma migrate dev
npx prisma generate

5️⃣ Start Server
npm run dev


Server runs at:

http://localhost:3000

🔑 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Categories
Method	Endpoint	Description
POST	/api/categories	Create category
GET	/api/categories	Get user categories
Transactions
Method	Endpoint	Description
POST	/api/transactions	Add transaction
GET	/api/transactions	List transactions
Budgets
Method	Endpoint	Description
POST	/api/budgets	Create or update budget
GET	/api/budgets	Get budgets
Analytics
Method	Endpoint	Description
GET	/api/summary	Income, Expense, Savings
GET	/api/category-breakdown	Expense per category
GET	/api/budget-usage	Budget vs Spend
📌 Sample Request (REST Client)
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

Composite unique constraints (DB-level data integrity)

Budget enforcement before expense creation

Monthly financial analytics queries

PostgreSQL aggregation queries

Secure JWT authentication

Clean architecture (Controller → Service → DB)

Type-safe backend using TypeScript

Scalable modular folder structure

🧩 Future Enhancements

Role-based access control (Admin/User)

Recurring transactions

Notifications when budget exceeds 80%

GraphQL API

Redis caching for analytics

Docker deployment

Frontend dashboard (Next.js)

👨‍💻 Author

Aditya Sharma
Full Stack Developer | Backend & Fintech Systems Enthusiast