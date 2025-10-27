# 🚀 Quick Deployment Guide

Follow these steps to deploy Finovate in 30 minutes!

## Prerequisites
- [ ] GitHub account
- [ ] Git installed locally
- [ ] Code pushed to GitHub repository

---

## Step 1: MongoDB Atlas (5 mins)

1. Go to https://mongodb.com/atlas/database
2. Sign up → Create Free Cluster (M0)
3. Create database user (username/password)
4. Network Access → Add IP `0.0.0.0/0`
5. Copy connection string
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/finovate
   ```

---

## Step 2: Deploy Backend to Render (10 mins)

1. Go to https://render.com → Sign up
2. **New** → **Web Service**
3. Connect GitHub repository
4. Configure:
   ```
   Name: finovate-backend
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```
5. **Environment Variables** → Add:
   ```
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=any_random_32_character_string_here
   NODE_ENV=production
   ```
6. **Create Web Service**
7. Copy URL: `https://finovate-backend-xxxx.onrender.com`

---

## Step 3: Deploy Frontend to Vercel (5 mins)

1. Go to https://vercel.com → Sign up with GitHub
2. **New Project** → Import your repository
3. Configure:
   ```
   Framework: Create React App
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: build
   ```
4. **Environment Variables** → Add:
   ```
   REACT_APP_BACKEND_URL=https://finovate-backend-xxxx.onrender.com
   REACT_APP_DASHBOARD_URL=https://finovate-dashboard-yyyy.vercel.app
   ```
   *(You'll update dashboard URL after step 4)*

5. **Deploy**
6. Copy URL: `https://finovate-xxxx.vercel.app`

---

## Step 4: Deploy Dashboard to Vercel (5 mins)

1. On Vercel → **New Project**
2. Import **same repository**
3. Configure:
   ```
   Framework: Create React App
   Root Directory: dashboard
   Build Command: npm run build
   Output Directory: build
   ```
4. **Environment Variables** → Add:
   ```
   REACT_APP_BACKEND_URL=https://finovate-backend-xxxx.onrender.com
   REACT_APP_FRONTEND_URL=https://finovate-xxxx.vercel.app
   ```
5. **Deploy**
6. Copy URL: `https://finovate-dashboard-yyyy.vercel.app`

---

## Step 5: Update Frontend Environment (2 mins)

1. Go back to **Frontend project** on Vercel
2. Settings → Environment Variables
3. **Update** `REACT_APP_DASHBOARD_URL`:
   ```
   REACT_APP_DASHBOARD_URL=https://finovate-dashboard-yyyy.vercel.app
   ```
4. **Redeploy** (Deployments tab → click "..." → Redeploy)

---

## Step 6: Update Backend CORS (3 mins)

1. Open `backend/index.js` locally
2. Find the `app.use(cors())` line
3. Replace with:
   ```javascript
   const allowedOrigins = [
     'https://finovate-xxxx.vercel.app',        // Your frontend URL
     'https://finovate-dashboard-yyyy.vercel.app', // Your dashboard URL
     'http://localhost:3000',
     'http://localhost:3001'
   ];

   app.use(cors({
     origin: function(origin, callback) {
       if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
       } else {
         callback(new Error('Not allowed by CORS'));
       }
     },
     credentials: true
   }));
   ```
4. Commit and push to GitHub
5. Render will auto-deploy the changes

---

## Step 7: Test Your Deployment ✅

1. Visit your **frontend URL**: `https://finovate-xxxx.vercel.app`
2. Click **Signup**
3. Create an account:
   ```
   Email: Test1@test.com
   Password: Test@123 (must have uppercase, lowercase, number)
   ```
4. You should be redirected to **dashboard**
5. Try buying a stock from the watchlist
6. Check **Holdings**, **Orders**, **Positions** pages

---

## 🎉 You're Live!

Your URLs:
- **Frontend (Landing)**: `https://finovate-xxxx.vercel.app`
- **Dashboard (Trading)**: `https://finovate-dashboard-yyyy.vercel.app`
- **Backend API**: `https://finovate-backend-xxxx.onrender.com`

---

## Common Issues & Fixes

### Issue: "Network Error" when signing up
**Fix:** Backend CORS not configured - update allowed origins

### Issue: Redirect not working after login
**Fix:** Check environment variables match your actual URLs

### Issue: Backend responds slowly
**Fix:** Render free tier sleeps after 15 mins - first request is slow

### Issue: Can't see holdings after buying
**Fix:** Check MongoDB connection string and database name

---

## Optional: Custom Domain

### Add Your Own Domain (e.g., finovate.com)

1. Buy domain from Namecheap/GoDaddy
2. In Vercel project → Settings → Domains
3. Add domain: `finovate.com`
4. Add subdomain: `dashboard.finovate.com`
5. Update DNS records as shown by Vercel
6. Wait 24-48 hours for DNS propagation
7. Update all environment variables with new URLs

---

## Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas

**Remember:** All these services have FREE tiers perfect for demo/portfolio projects!
