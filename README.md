# SaaS Backend (Multi-Tenant System)

## Overview
This project is a minimal SaaS backend built with Node.js, Express, and MongoDB.

It demonstrates a clean multi-tenant architecture where:
- A super admin creates companies
- Each company operates as an isolated account
- Companies can log in
- Companies can create and manage their own employees

---

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt

---

## Project Structure

```
/config
/models
/controllers
/routes
/middleware
/utils
server.js
seedSuperAdmin.js
```

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <https://github.com/jesutofunmiisrael/saas-backend.git>
cd saas-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## MongoDB Setup

Add this IP in MongoDB Atlas:
```
0.0.0.0/0
```

---

## Seed Super Admin

```bash
node seedSuperAdmin.js
```

Email: admin@example.com  
Password: admin123  

---

## Run Server

```bash
npm run dev
```

---

## API Endpoints

### Auth
- POST /api/auth/superadmin-login  
- POST /api/auth/company-login  

### Company
- POST /api/company/create  

### Employee
- POST /api/employee/create  
- GET /api/employee/all  

---

## Authentication

Use:
```
Authorization: Bearer <token>
```

---

## Notes

- Multi-tenant using companyId  
- Simple and clean structure  
- No extra features added