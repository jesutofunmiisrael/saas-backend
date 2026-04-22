# SaaS Backend (Multi-Tenant System)

## Overview
This project is a minimal SaaS backend built with Node.js, Express, and MongoDB.

It demonstrates a clean multi-tenant architecture where:
- A super admin creates companies
- Each company operates as an isolated account
- Company admins manage employees within their organization
- Employees belong strictly to their company

The focus is on simplicity, clean structure, secure backend logic, and preparing the codebase for scaling.

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
/services  
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
All operations are strictly scoped using the authenticated user's `companyId`.

- Backend does NOT trust client-provided companyId
- All queries use `req.user.companyId`
- Prevents cross-company data access

Example:
Employee operations use both employee ID and authenticated companyId to ensure strict isolation.

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

### Service Layer Refactor

The codebase has been refactored to follow:

controllers → services → models

This keeps:
- controllers focused on request/response handling
- services responsible for business logic
- models responsible for database structure

This improves maintainability and makes the code easier to scale.

---

### Validation and Error Handling

Basic request validation has been added to keep the implementation simple and reliable.

Examples:
- missing required fields
- missing company context
- invalid employee ID

API responses now follow a consistent format:

Success:
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

Error:
{
  "success": false,
  "message": "Error message"
}

Sensitive data such as passwords are not returned in API responses.

---

## Notes

- Clean and minimal implementation
- No unnecessary features added
- Focused on structure, security, and clarity
- Prepared for future scaling into larger product modules