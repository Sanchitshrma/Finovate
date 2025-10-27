# Authentication & Authorization Guide

This document explains the JWT-based authentication and authorization system implemented in Finovate.

## Overview

The application uses **JWT (JSON Web Tokens)** for authentication and **bcrypt** for password hashing. When users sign up or log in, they receive a JWT token that must be included in subsequent API requests to access protected resources.

## Backend Implementation

### 1. Dependencies

The following packages are used:
- **bcrypt**: Password hashing (8 rounds)
- **jsonwebtoken**: JWT token generation and verification
- **dotenv**: Environment variable management

### 2. Environment Variables

Add to `backend/.env`:
```
JWT_SECRET=your_secret_key_here
```

**Important**: Change the JWT_SECRET in production to a strong, random value.

### 3. Authentication Middleware

Location: `backend/middleware/auth.js`

The `authenticateToken` middleware:
- Extracts JWT token from the `Authorization` header (format: `Bearer <token>`)
- Verifies the token using `JWT_SECRET`
- Attaches user data to `req.user` for use in route handlers
- Returns 401 if token is missing
- Returns 403 if token is invalid or expired

### 4. Protected Routes

The following routes require authentication (JWT token in headers):
- `GET /allHoldings` - Fetch all holdings
- `GET /allPositions` - Fetch all positions
- `GET /holdings/:userId` - Fetch user-specific holdings
- `GET /orders` - Fetch orders
- `POST /newOrder` - Create a new buy/sell order

### 5. Authentication Endpoints

#### POST /signup
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "User already exist"
}
```

#### POST /login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "User found",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

**Error Responses:**
- 400: `{ "message": "Password not match" }`
- 400: `{ "message": "User not found" }`

### 6. Token Expiration

JWT tokens expire after **24 hours**. After expiration, users must log in again.

## Frontend Implementation

### 1. Token Storage

After successful login/signup, the frontend stores:
- **JWT token** in `localStorage.setItem("token", token)`
- **User info** in `localStorage.setItem("user", JSON.stringify(user))`

### 2. Signup Component

Location: `frontend/src/landing_page/signup/Signup.js`

Handles both signup and login:
- Validates email and password
- Sends credentials to backend
- Stores JWT token and user data in localStorage
- Redirects to dashboard app (http://localhost:3000) on success

**Note**: Frontend runs on port 3001, Dashboard runs on port 3000

## Dashboard Implementation

### 1. Axios Configuration

Location: `dashboard/src/utils/axios.js`

A custom axios instance with interceptors:

**Request Interceptor:**
- Automatically attaches JWT token to all requests
- Format: `Authorization: Bearer <token>`

**Response Interceptor:**
- Handles 401 (unauthorized) responses
- Clears localStorage and redirects to login on token expiration

### 2. Usage in Components

All dashboard components use the configured axios instance:

```javascript
import api from "../utils/axios";

// GET request
api.get("/allHoldings").then(res => {
  setAllHoldings(res.data);
});

// POST request
api.post("/newOrder", {
  name: "AAPL",
  qty: 10,
  price: 150.0,
  mode: "BUY"
});
```

### 3. Components Updated

The following components now use authenticated API calls:
- `BuyActionWindow.js` - POST /newOrder
- `SellActionWindow.js` - POST /newOrder, GET /holdings/:userId
- `Holdings.js` - GET /allHoldings
- `Positions.js` - GET /allPositions
- `Orders.js` - GET /orders

## Security Best Practices

### Implemented
✅ Password hashing with bcrypt (8 rounds)
✅ JWT tokens with expiration (24h)
✅ Token verification on protected routes
✅ Automatic token refresh on API requests
✅ Logout on token expiration

### Recommendations for Production
⚠️ Use HTTPS only in production
⚠️ Change JWT_SECRET to a strong random value
⚠️ Implement refresh tokens for long sessions
⚠️ Add rate limiting to prevent brute force attacks
⚠️ Consider implementing 2FA
⚠️ Add CSRF protection
⚠️ Validate and sanitize all user inputs

## Testing Authentication

### 1. Signup
```bash
curl -X POST http://localhost:8000/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 3. Access Protected Route
```bash
curl http://localhost:8000/allHoldings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Troubleshooting

### Common Issues

**401 Unauthorized**
- Token is missing or not in correct format
- Check that token is sent as `Authorization: Bearer <token>`

**403 Forbidden**
- Token is invalid or expired
- Login again to get a new token

**Backend not starting**
- Check that `JWT_SECRET` is set in `.env`
- Verify MongoDB connection

**Dashboard not loading data**
- Check browser console for errors
- Verify token is stored in localStorage
- Check network tab to see if Authorization header is present

## Flow Diagram

```
User Signup/Login
      ↓
Frontend sends credentials
      ↓
Backend validates with bcrypt
      ↓
Backend generates JWT token (24h expiry)
      ↓
Frontend stores token in localStorage
      ↓
Frontend makes API request
      ↓
Axios interceptor adds token to headers
      ↓
Backend middleware verifies token
      ↓
Backend processes request
      ↓
Response sent to frontend
```

## Additional Notes

- All tokens include user ID and email in the payload
- Tokens are stateless (no server-side session storage)
- Frontend automatically includes tokens in all requests via axios interceptors
- Expired tokens automatically trigger logout and redirect to signup page
