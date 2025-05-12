# Finovate 🧾📈

**Finovate** is a full-stack stock trading platform built using the MERN stack. It simulates trading functionalities and provides users with real-time market data, interactive stock charts, and a responsive UI to enhance the trading experience.

---

## 🚀 Features

- 📊 Real-time stock price charts
- 🔐 User authentication and session management
- 💼 Simulated buy/sell trading actions
- 🧾 Stock listing interface with detailed info
- 📱 Fully responsive UI using Bootstrap and Material UI
- ⚙️ Backend API with Express.js and MongoDB for data handling

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- HTML, CSS, JavaScript
- Bootstrap & Material UI

**Backend:**
- Node.js
- Express.js
- MongoDB

**Tools & Libraries:**
- Axios (API Calls)
- Chart.js or Recharts (for charts)
- Bcrypt (for password hashing)

---

## 📂 Project Structure
```bash
finovate/
│
├── backend/                 # Node.js + Express.js backend
│   ├── models/             # MongoDB models
│   ├── schemas/            # Mongoose schemas
│   └── index.js            # Entry point & server setup
│
├── frontend/                # React frontend
│   ├── public/             # Static files (index.html, manifest, images)
│   └── src/                # Main UI code
│       ├── landing_page/
│       │   ├── about/
│       │   ├── home/
│       │   ├── pricing/
│       │   ├── product/
│       │   ├── signup/
│       │   └── support/
│       ├── Footer.js
│       ├── Navbar.js
│       └── index.js
│
├── dashboard/               # React dashboard for user portfolios
│   ├── public/
│   └── src/
│       ├── components/
│       └── data/
│
├── README.md
└── .gitignore
```
---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB

### Clone the Repo
```bash
git clone https://github.com/yourusername/finovate.git
cd finovate
```
###Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# MONGO_URI=your_mongo_connection_string
npm start
```

###Frontend Setup 
```bash
cd frontend
npm install
npm start
```

###Dashboard Setup
```bash
cd dashboard
npm install
npm start
