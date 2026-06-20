# ShopZone - Full-Stack E-Commerce Application

A complete e-commerce web application built with HTML/CSS/Vanilla JS (frontend) and Node.js + Express + MongoDB (backend).

## Features

- User registration & login with JWT authentication
- Admin login with protected dashboard
- Product catalog with search & category filtering
- Shopping cart (localStorage)
- Checkout with shipping form
- Order history for users
- Admin: Add / Edit / Delete products
- Admin: View all orders & update order status
- bcrypt password hashing
- 8 sample products auto-seeded on startup
- 1 default admin account auto-created on startup

## Project Structure

```
ecommerce/
├── backend/
│   ├── config/db.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── login.html
    ├── register.html
    ├── cart.html
    ├── checkout.html
    ├── orders.html
    ├── admin.html
    ├── style.css
    └── script.js
```

## Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup

Open the `frontend/` folder using a local static server:

```bash
# Option 1: VS Code Live Server extension (recommended)
# Option 2:
npx serve frontend
# Option 3:
cd frontend && python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

## Default Credentials

| Role  | Email             | Password  |
|-------|-------------------|-----------|
| Admin | admin@shop.com    | admin123  |

## API Endpoints

### Auth
| Method | Endpoint              | Access  |
|--------|-----------------------|---------|
| POST   | /api/auth/register    | Public  |
| POST   | /api/auth/login       | Public  |
| GET    | /api/auth/me          | Private |

### Products
| Method | Endpoint              | Access  |
|--------|-----------------------|---------|
| GET    | /api/products         | Public  |
| GET    | /api/products/:id     | Public  |
| POST   | /api/products         | Admin   |
| PUT    | /api/products/:id     | Admin   |
| DELETE | /api/products/:id     | Admin   |

### Orders
| Method | Endpoint                  | Access  |
|--------|---------------------------|---------|
| POST   | /api/orders               | Private |
| GET    | /api/orders/myorders      | Private |
| GET    | /api/orders               | Admin   |
| GET    | /api/orders/:id           | Private |
| PUT    | /api/orders/:id/status    | Admin   |

## Environment Variables

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
```

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JSON Web Tokens (JWT), bcryptjs