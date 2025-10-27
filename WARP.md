# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Finovate is a full-stack stock trading simulation platform built with the MERN stack. It consists of three separate applications:
- **Backend**: Express.js API server with MongoDB
- **Frontend**: React-based landing/marketing website
- **Dashboard**: React-based trading dashboard with real-time stock charts

## Development Commands

### Backend (Express.js API)
```bash
cd backend
npm install
npm start  # Runs with nodemon on port 8000
```

**Environment Setup**: Create `backend/.env` with:
```
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (Marketing Site)
```bash
cd frontend
npm install
npm start  # Runs on port 3001
npm run build  # Production build
npm test  # Run tests
```

### Dashboard (Trading Interface)
```bash
cd dashboard
npm install
npm start  # Runs on port 3000
npm run build  # Production build
npm test  # Run tests
```

**Port Configuration**:
- Frontend runs on port 3001 (configured in `frontend/.env`)
- Dashboard runs on port 3000 (configured in `dashboard/.env`)
- After login/signup, users are redirected from frontend to dashboard

## Architecture

### Backend Architecture

**Entry Point**: `backend/index.js`
- Express server on port 8000
- CORS enabled for cross-origin requests
- MongoDB connection on server startup
- Uses bcrypt for password hashing (8 rounds)

**Data Layer Pattern**:
- **Schemas** (`backend/schemas/`): Define Mongoose schemas (structure only)
- **Models** (`backend/models/`): Export Mongoose models wrapping schemas
- Models are imported and used directly in index.js

**API Endpoints**:
- `GET /allHoldings` - Fetch all user holdings
- `GET /allPositions` - Fetch current positions
- `GET /holdings/:userId` - User-specific holdings
- `GET /orders` - Fetch orders (sorted by date DESC)
- `POST /newOrder` - Create buy/sell order (requires: name, qty, price, mode)
- `POST /signup` - User registration (email + bcrypt hashed password)
- `POST /login` - User authentication (bcrypt comparison)

**Data Models**:
- **HoldingsModel**: Long-term stock holdings (name, qty, avg, price, net, day)
- **PositionsModel**: Current trading positions (includes product type, isLoss flag)
- **OrdersModel**: Buy/sell order history (includes mode, date)
- **UserModel**: User authentication (email, hashed password)

### Frontend Architecture

**Entry Point**: `frontend/src/index.js`
- React Router for navigation
- Persistent Navbar and Footer across all routes

**Page Structure** (`frontend/src/landing_page/`):
- Each major page is a folder with subcomponents (Hero, sections, etc.)
- Routes: `/` (home), `/signup`, `/about`, `/product`, `/pricing`, `/support`
- Uses Bootstrap and Material UI for styling

**Key Pattern**: Landing page is component-based with reusable sections

### Dashboard Architecture

**Entry Point**: `dashboard/src/index.js` → `components/Home.js`
- TopBar + Dashboard layout

**Core Pattern - GeneralContext**:
- React Context API manages global buy/sell modal state
- `GeneralContextProvider` wraps dashboard and injects BuyActionWindow/SellActionWindow modals
- Context methods: `openBuyWindow(uid)`, `closeBuyWindow()`, `openSellWindow(uid)`, `closeSellWindow()`

**Dashboard Component**:
- Left sidebar: `WatchList` (persistent, wrapped in GeneralContextProvider)
- Right content area: React Router with nested routes
  - `/` → Summary
  - `/orders` → Orders
  - `/holdings` → Holdings
  - `/positions` → Positions
  - `/funds` → Funds
  - `/apps` → Apps

**WatchList Behavior**:
- Displays stocks from `dashboard/src/data/data.js`
- Hover actions on each stock: Buy, Sell, Analytics, More
- Buy/Sell buttons trigger context methods to open modals

**Modal Windows**:
- `BuyActionWindow` and `SellActionWindow` float as overlays
- POST to `http://localhost:8000/newOrder` with stock data
- Hard-coded backend URL - change for production

**Charting**:
- Uses Chart.js with react-chartjs-2
- `DoughnutChart` visualizes watchlist distribution
- `VerticalGraph` for other chart types

## Authentication & Authorization

**Implementation**: JWT-based authentication with bcrypt password hashing

**Backend**:
- JWT tokens generated on login/signup (24h expiry)
- Authentication middleware at `backend/middleware/auth.js`
- Protected routes require `Authorization: Bearer <token>` header
- All sensitive routes are protected (holdings, positions, orders, newOrder)

**Frontend/Dashboard**:
- JWT tokens stored in localStorage after login/signup
- Custom axios instance at `dashboard/src/utils/axios.js`
- Automatic token injection via request interceptors
- Automatic logout on token expiration (401 response)

**See AUTHENTICATION.md for detailed documentation**

## Key Technologies

- **Backend**: Express 4.x, Mongoose 8.x, Bcrypt, JWT (jsonwebtoken), Passport (configured but unused)
- **Frontend/Dashboard**: React 18, React Router v6/v7, Axios
- **UI Libraries**: Material-UI (dashboard), Bootstrap (frontend)
- **Dev Tools**: Nodemon for backend hot reload, Create React App for frontend builds

## Important Notes

- Backend must run before frontend/dashboard for API calls to work
- MongoDB must be running and accessible via MONGODB_URL
- **Authentication is now enforced**: All protected routes require valid JWT token
- JWT_SECRET must be set in backend/.env
- Passport.js is installed but not actively used (JWT handles authentication)
- Stock data in dashboard is static (from `data/data.js`) - real-time integration pending
- Tokens expire after 24 hours - users must re-login
