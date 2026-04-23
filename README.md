# SaaS Backend (Multi-Tenant System)

## Overview
This project is a minimal SaaS backend built with Node.js, Express, and MongoDB.

It demonstrates a clean multi-tenant architecture where:
- A super admin creates companies
- Each company operates as an isolated account
- Company admins manage employees within their organization
- Employees belong strictly to their company

The focus is on clean structure, secure backend logic, and preparing the system for scalability.

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

## Service Layer Architecture

The codebase follows a structured pattern:

controllers → services → models  

- Controllers handle request/response only  
- Services handle business logic and validation  
- Models handle database structure  

This separation improves maintainability and scalability.

---

## Validation Strategy

Validation is handled inside services using a consistent pattern.

Examples:
- Missing required fields  
- Missing company context  
- Invalid employee ID  

All validation errors are treated as expected application errors.

---

## Error Handling

The application uses a structured error handling approach:

- Expected errors use a custom AppError class  
- Unexpected errors return a generic internal server error  

Response format is consistent across all endpoints:

### Success
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

### Error
{
  "success": false,
  "message": "Error message"
}

---

## Security Notes

- Passwords are hashed using bcrypt  
- Sensitive data (like passwords) is never returned in responses  
- Access control is enforced at the backend level  

---

## Notes

- Clean and minimal implementation  
- No unnecessary features added  
- Focused on structure, security, and clarity  
- Designed to scale beyond simple use cases  