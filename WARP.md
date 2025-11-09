# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Finovate is a full-stack stock trading simulation platform built with the MERN stack. It consists of three separate applications:
- Backend: Express.js API server with MongoDB
- Frontend: React-based landing/marketing website
- Dashboard: React-based trading dashboard with charts and authenticated API usage

## Development Commands

### Backend (Express.js API)
```bash
cd backend
npm install
npm start  # nodemon on port 8000
```
Environment: create `backend/.env` with
```
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```
> No backend test or lint scripts are defined.

### Frontend (Marketing Site)
```bash
cd frontend
npm install
npm start   # port 3001
npm run build
npm test    # CRA/Jest watch mode
```

### Dashboard (Trading Interface)
```bash
cd dashboard
npm install
npm start   # port 3000
npm run build
npm test    # CRA/Jest watch mode
```

### Testing (CRA projects)
- Run once (no watch):
```bash
npm test -- --watchAll=false
```
- Run a single test file:
```bash
npm test -- -- src/<file>.test.js
```
- Run tests by name/pattern:
```bash
npm test -- -t "pattern"
```

### Linting
- No standalone lint scripts; CRA enforces ESLint during `start`/`build`.

### Ports and URLs
- Frontend: port 3001 (via `frontend/.env`)
- Dashboard: port 3000 (via `dashboard/.env`)
- Backend: port 8000
- Dashboard API base URL can be overridden via `REACT_APP_BACKEND_URL`. In production, it falls back to Render (`https://finovate-uh8i.onrender.com`) if not set; otherwise defaults to `http://localhost:8000` in development.

## Architecture

### Backend

Entry: `backend/index.js`
- Express server (port 8000), CORS, JSON body parsing
- MongoDB connects at startup using `MONGODB_URL`
- Bcrypt for password hashing (8 rounds), JWT for auth (24h expiry)

Data layer pattern
- Schemas (`backend/schemas/`): structure-only Mongoose schemas
- Models (`backend/models/`): Mongoose models wrapping schemas, imported directly in `index.js`

Key endpoints
- Auth: `POST /signup`, `POST /login`, `GET /verify`
- Trading data: `GET /allHoldings`, `GET /allPositions`, `GET /holdings/:userId`, `GET /orders`
- Orders: `POST /newOrder` (BUY/SELL; updates holdings accordingly)
- Watchlist: `GET /watchlist`, `POST /watchlist`, `DELETE /watchlist/:symbol`
- Dev seed: `POST /addSamplePositions` (authenticated)

Models
- HoldingsModel, PositionsModel, OrdersModel, WatchlistModel, UserModel

### Frontend

Entry: `frontend/src/index.js`
- React Router for navigation with persistent `Navbar` and `Footer`
- Routes: `/`, `/signup`, `/about`, `/product`, `/pricing`, `/support`

### Dashboard

Entry: `dashboard/src/index.js` → `components/Home.js`
- All routes are wrapped in `ProtectedRoute` to require a valid JWT in localStorage
- Layout: `TopBar` + main `Dashboard`

API client
- `dashboard/src/utils/axios.js`: axios instance
  - `baseURL` resolves from `REACT_APP_BACKEND_URL`, else Render in production, else `http://localhost:8000`
  - Request interceptor adds `Authorization: Bearer <token>`
  - Response interceptor clears storage and redirects to `/signup` on 401

Data/UI
- Static seed data for lists/charts in `dashboard/src/data/data.js`
- Charting via `chart.js` + `react-chartjs-2`

## Authentication & Authorization

- Middleware: `backend/middleware/auth.js` (`authenticateToken`) guards protected routes
- Tokens stored in frontend/dashboard `localStorage`
- Protected routes: holdings, positions, orders, newOrder, watchlist, addSamplePositions
- Token expiry: 24h
- See `AUTHENTICATION.md` for request/response examples and troubleshooting

## Key Technologies

- Backend: Express 4.x, Mongoose 8.x, Bcrypt, JWT (jsonwebtoken), Passport (installed but unused)
- Frontend/Dashboard: React 18, React Router v6/v7, Axios, CRA
- UI: Material-UI (dashboard), Bootstrap (frontend)
- Dev: Nodemon, CRA

## Notes

- Start backend before frontend/dashboard
- Ensure MongoDB is reachable via `MONGODB_URL`
- Tokens must be present for protected API calls
- Stock data in dashboard is static (real-time integration pending)
