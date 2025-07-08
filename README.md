# Urban Wheels Frontend

## Project Overview

This is the frontend for the Urban Wheels application, responsible for the user interface and experience. It connects to the Rails backend API.

---

## Prerequisite

Before running the frontend, make sure the **backend server is up and running**.

Please follow the backend setup instructions first:
- Repository: [urban-wheels-backend](https://github.com/yaduvanshee/urban-wheels-backend)
- Start the backend server at: http://localhost:3000

---

## 🛠️ Getting Started

### Requirements
- Node.js (20.x)
- npm or yarn

### Steps

```sh
# 1. Clone the repository
git clone https://github.com/yaduvanshee/urban-wheels-frontend.git
cd urban-wheels-frontend

# 2. Install dependencies
npm install
# or
yarn install

# 3. Start the frontend dev server
npm run dev
# or
yarn dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🔗 API Integration

Ensure that API requests are pointed to: `http://localhost:3000` (or your running backend URL).
You may configure this in `.env` or wherever the base URL is set.

---

## 👥 Seeded Users

The backend includes seed data to help with testing. After running:

```sh
rails db:seed
```

These users will be available:

### 🔐 Admin User

- **Email**: `admin@example.com`
- **Password**: `password`
- **Role**: `Admin`
- **Wallet**: ₹1000.00

### 👤 Regular Users

| Email            | Name       | Password | Wallet  |
|------------------|------------|----------|---------|
| user1@gmail.com  | User One   | password | ₹1000.00 |
| user2@gmail.com  | User Two   | password | ₹1000.00 |

Use these credentials to test login flows and access various features.
