# Finovate - Quick Start Guide

## Prerequisites
- Node.js and npm installed
- MongoDB running locally or accessible via connection string

## Step 1: Start Backend (Port 8000)

Open a terminal:
```bash
cd backend
npm install  # Only needed first time
npm start
```

**Expected output**: `App started 8000` and `DB Connected`

## Step 2: Start Dashboard (Port 3000)

Open a **new** terminal:
```bash
cd dashboard
npm install  # Only needed first time
npm start
```

**Expected output**: Dashboard will open at `http://localhost:3000`

## Step 3: Start Frontend (Port 3001)

Open a **new** terminal:
```bash
cd frontend
npm install  # Only needed first time
npm start
```

**Expected output**: Frontend will open at `http://localhost:3001`

## How to Use

1. **Visit Frontend**: Go to `http://localhost:3001`
2. **Sign Up/Login**: Click on signup and create an account or login
3. **Get Redirected**: After successful login, you'll be redirected to the dashboard at `http://localhost:3000`
4. **Start Trading**: Use the dashboard to buy/sell stocks, view holdings, positions, and orders

## Port Configuration

| Application | Port | URL |
|------------|------|-----|
| Backend API | 8000 | http://localhost:8000 |
| Dashboard | 3000 | http://localhost:3000 |
| Frontend | 3001 | http://localhost:3001 |

## Important Notes

- **All three apps must be running** for the full experience
- Backend must start first (otherwise frontend/dashboard API calls will fail)
- JWT tokens are stored in browser localStorage
- Tokens expire after 24 hours (you'll need to login again)

## Troubleshooting

### Port already in use
If you get "port already in use" error:
- Kill the process using that port
- Or change the port in the respective `.env` file

### Cannot connect to backend
- Ensure backend is running on port 8000
- Check MongoDB connection in `backend/.env`
- Check JWT_SECRET is set in `backend/.env`

### 401 Unauthorized errors
- Token expired - login again
- Token not stored - check browser localStorage
- Backend not running or JWT_SECRET missing

### Dashboard not loading after login
- Ensure dashboard app is running on port 3000
- Check browser console for errors
- Verify token is stored in localStorage (check DevTools > Application > Local Storage)
