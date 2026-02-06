backend/
│
├── prisma/
│   ├── schema.prisma          # Prisma data models & relations
│   └── migrations/            # Auto-generated DB migrations
│
├── src/
│   │
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   │
│   ├── config/
│   │   ├── db.js              # Prisma client initialization
│   │   └── env.js             # Environment variable validation
│   │
│   ├── routes/
│   │   ├── auth.routes.js     # Login, register routes
│   │   ├── user.routes.js     # User-related routes
│   │   ├── transaction.routes.js
│   │   ├── category.routes.js
│   │   ├── budget.routes.js
│   │   └── index.js           # Route aggregator
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── transaction.controller.js
│   │   ├── category.controller.js
│   │   └── budget.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js --done
│   │   ├── transaction.service.js --done
│   │   ├── category.service.js  ---done
│   │   ├── budget.service.js --done
│   │   └── analytics.service.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js # JWT verification
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── utils/
│   │   ├── jwt.js             # Token generation & verification
│   │   ├── hash.js            # bcrypt helpers
│   │   └── constants.js
│   │
│   └── validations/
│       ├── auth.validation.js
│       ├── transaction.validation.js
│       └── budget.validation.js
│
├── .env
├── .env.example
├── package.json
├── README.md
└── nodemon.json
