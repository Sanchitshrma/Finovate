# Finovate 📈

A full-stack stock trading platform inspired by Zerodha — built with React, Node.js/Express, and MongoDB. Finovate lets users sign up, track a watchlist, place simulated buy/sell orders, monitor holdings & positions, and generate AI-powered stock research briefs using Google's Gemini API.

**🔗 Live Demo:** [finovate-frontend.vercel.app](https://finovate-frontend.vercel.app/)

---

## ✨ Features

- 🔐 **Authentication** — Secure signup/login with JWT and bcrypt-hashed passwords
- 📊 **Trading Dashboard** — Holdings, positions, and order book, modeled on real brokerage concepts (CNC/delivery vs. MIS/intraday)
- 💹 **Simulated Order Execution** — Buy/sell flow with automatic weighted-average cost-basis calculation on holdings
- ⭐ **Watchlist** — Add/remove stocks per user, backed by a unique index to prevent duplicates
- 🤖 **AI Stock Insights** — On-demand research briefs (overview, trend, risks, catalysts, bull/base/bear outlook) generated via the Gemini API, proxied securely through the backend
- 📈 **Price Charts** — Historical price visualization with Chart.js, with live-data providers (Alpha Vantage / Finnhub) and a graceful simulated fallback when no API key is configured
- 🛡️ **Security-conscious rendering** — AI-generated HTML is sanitized with DOMPurify before being injected into the DOM

---

## 🏗️ Architecture

Finovate is split into **three independently deployable services**:

```
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│     frontend      │  JWT   │     dashboard      │  REST  │      backend       │
│  Landing, Signup,  │ ─────► │  Holdings, Orders,  │ ─────► │  Express + Mongo,   │
│  Login (Vercel)    │  URL   │  Watchlist, AI      │  API   │  JWT auth, Gemini   │
│                    │ handoff│  Insights (Vercel)  │        │  proxy (Render)     │
└──────────────────┘        └──────────────────┘        └──────────────────┘
```

- **`frontend/`** — Marketing pages + auth (signup/login/forgot-password). On successful login, hands off the JWT to the dashboard via a redirect URL (since the two apps live on different origins).
- **`dashboard/`** — The actual trading app: watchlist, holdings, positions, order placement, AI insights, charts.
- **`backend/`** — Express REST API: authentication, order/holdings logic, and a secure proxy to the Gemini API.

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, React Router, Axios |
| Dashboard | React.js, Material UI, Chart.js, DOMPurify |
| Backend | Node.js, Express.js, Mongoose |
| Database | MongoDB |
| Auth | JWT, bcrypt |
| AI | Google Gemini API (`gemini-2.5-flash`) |
| Market Data | Alpha Vantage / Finnhub (with simulated fallback) |
| Deployment | Vercel (frontend & dashboard), Render (backend) |

---

## 📁 Project Structure

```
Finovate/
├── frontend/        # Landing page + authentication
│   └── src/
│       ├── landing_page/
│       └── components/
├── dashboard/        # Trading dashboard (the core app)
│   └── src/
│       ├── components/
│       ├── services/     # stockService.js — live/simulated price data
│       └── utils/         # axios instance, gemini client
└── backend/           # REST API
    ├── models/
    ├── schemas/
    └── middleware/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/Finovate.git
cd Finovate
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```
Run it:
```bash
npm start
```
Backend runs on `http://localhost:8000`.

### 3. Dashboard setup
```bash
cd dashboard
npm install
```
Create a `.env` file in `dashboard/`:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_FRONTEND_URL=http://localhost:3001
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_STOCK_API_PROVIDER=alpha_vantage
REACT_APP_ALPHA_VANTAGE_KEY=your_key   # optional — falls back to simulated prices if omitted
```
Run it:
```bash
npm start
```
Dashboard runs on `http://localhost:3000`.

### 4. Frontend setup
```bash
cd frontend
npm install
```
Create a `.env` file in `frontend/`:
```env
PORT=3001
REACT_APP_DASHBOARD_URL=http://localhost:3000
REACT_APP_BACKEND_URL=http://localhost:8000
```
Run it:
```bash
npm start
```
Frontend runs on `http://localhost:3001`.

> 💡 No market-data API key? No problem — the dashboard automatically falls back to realistic simulated price movements, so the app stays fully functional for local testing.

---

## 🔑 Key API Endpoints (Backend)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate and receive a JWT |
| `GET` | `/verify` | Validate the current JWT |
| `GET` | `/allHoldings` | Get the authenticated user's holdings |
| `GET` | `/allPositions` | Get the authenticated user's positions |
| `POST` | `/newOrder` | Place a buy/sell order |
| `GET` | `/orders` | Get order history |
| `GET` / `POST` / `DELETE` | `/watchlist` | Manage the user's watchlist |
| `POST` | `/ai/insights` | Generate an AI stock research brief |

All routes except `/signup` and `/login` require an `Authorization: Bearer <token>` header.

---

## 🛡️ Security Notes

- Passwords are hashed with bcrypt before storage — never stored or returned in plaintext.
- All holdings/positions/orders/watchlist queries are scoped to the authenticated user via the JWT payload.
- AI-generated HTML is sanitized client-side with DOMPurify before rendering.
- This project simulates trade execution for demonstration purposes only — it does not connect to a real broker or exchange.

---

## 🗺️ Roadmap / Possible Improvements

- Wrap order placement in a MongoDB transaction for atomicity
- Add automated tests (Jest/Supertest for backend, RTL for frontend)
- Move JWT storage to httpOnly cookies
- Wire up real-time price streaming via WebSockets

---

## 👤 Author

**Sanchit Sharma**
[Portfolio](#) · [LinkedIn](#) · [GitHub](#)

---

## 📄 License

This project is open source and available for educational purposes.
