# SaaS Backend (Multi-Tenant System)

## Overview
This project is a minimal SaaS backend built with Node.js, Express, and MongoDB.

It demonstrates a clean multi-tenant architecture where:
- A super admin creates companies
- Each company operates as an isolated account
- Company admins manage employees within their organization
- Employees belong strictly to their company

The focus is on simplicity, clean structure, and secure backend logic.

---

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt

---

## Project Structure

/config  
/models  
/controllers  
/routes  
/middleware  
/utils  
server.js  
seedSuperAdmin.js  

---

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/jesutofunmiisrael/saas-backend.git  
cd saas-backend  

### 2. Install dependencies
npm install  

### 3. Create .env file
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

## MongoDB Setup

Add this IP in MongoDB Atlas:
0.0.0.0/0  

---

## Seed Super Admin

node seedSuperAdmin.js  

Default credentials:  
Email: admin@example.com  
Password: admin123  

---

## Run Server

npm run dev  

---

## API Endpoints

### Auth
POST /api/auth/superadmin-login  
POST /api/auth/company-login  

### Company
POST /api/company/create  

### Employee
POST /api/employee/create  
GET /api/employee/all  
PUT /api/employee/update/:id  

---

## Authentication

Authorization: Bearer <token>  

---

## Architecture Decisions

### Multi-Tenant Isolation
All operations are strictly scoped using the authenticated user's companyId.

- Backend does NOT trust client-provided companyId  
- All queries use req.user.companyId  
- Prevents cross-company data access  

Example:
Employee operations use both employee ID and companyId to ensure strict isolation.

---

### Role-Based Access Control

Roles:
- superadmin
- admin
- employee

Rules:
- Superadmin creates companies  
- Admin manages employees  
- Employee has restricted access  

---

### Access Enforcement

- Only admins can create employees  
- Employees cannot create or modify other employees  
- All access control is enforced in backend middleware  

---

## Notes

- Clean and minimal implementation  
- No unnecessary features added  
- Focused on structure, security, and clarity  