# Banking API

## Overview
A simple Banking API built with Express.js and JWT authentication. The API provides secure endpoints for banking operations including login, balance checking, deposits, and withdrawals.

## Project Architecture
- **Framework**: Express.js (Node.js)
- **Authentication**: JWT (JSON Web Tokens)
- **Port**: 3000
- **Storage**: In-memory (for demo purposes)

## API Endpoints

### Public Routes
- `POST /login` - User authentication
  - Body: `{ "username": "bankuser", "password": "securepass" }`
  - Returns: JWT token

### Protected Routes (Require JWT Token)
- `GET /balance` - Get account balance
- `POST /deposit` - Deposit funds
  - Body: `{ "amount": <number> }`
- `POST /withdraw` - Withdraw funds
  - Body: `{ "amount": <number> }`

## Default Credentials
- Username: `bankuser`
- Password: `securepass`
- Initial Balance: $1000

## Recent Changes
- **October 17, 2025**: Initial project setup
  - Created Express.js banking API with JWT authentication
  - Configured server to run on port 3000
  - Set up workflow for automatic server restart

## Technical Notes
- SECRET_KEY can be customized via environment variable
- All protected routes require Bearer token in Authorization header
- Balance is stored in-memory and resets on server restart
