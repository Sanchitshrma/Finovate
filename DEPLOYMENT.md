# Finovate Deployment Guide

This guide will help you deploy the Finovate stock trading platform to production.

## Architecture Overview

Finovate consists of 3 applications:
1. **Backend** (Express.js API) - Port 8000
2. **Frontend** (React landing page) - Port 3001
3. **Dashboard** (React trading app) - Port 3000

## Recommended Deployment Strategy

### Option 1: Full Stack on Render/Railway (Recommended for Beginners)

**Platforms:**
- Backend: [Render.com](https://render.com) (Free tier)
- Database: [MongoDB Atlas](https://mongodb.com/atlas) (Free tier)
- Frontend & Dashboard: [Vercel](https://vercel.com) (Free tier)

### Option 2: AWS/DigitalOcean (For Production)

**Components:**
- EC2/Droplet: Backend + Frontend + Dashboard
- MongoDB Atlas: Database
- CloudFront/CDN: Static assets

---

## Step-by-Step Deployment

## Part 1: Prepare MongoDB Atlas

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (M0 Free tier)

### 2. Configure Database
```bash
# Create a database called "finovate"
# Create collections: users, holdings, positions, orders, watchlists
```

### 3. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/finovate?retryWrites=true&w=majority
   ```

### 4. Whitelist IP Addresses
- Go to Network Access
- Add IP: `0.0.0.0/0` (allow from anywhere)
- Or add specific IPs of your hosting platform

---

## Part 2: Deploy Backend (Render.com)

### 1. Prepare Backend for Deployment

Create `backend/.env.production`:
```env
MONGODB_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
NODE_ENV=production
PORT=8000
```

Create `backend/package.json` script:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### 2. Deploy to Render

1. **Create Account** at [Render.com](https://render.com)

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use manual deployment

3. **Configure Service**
   ```
   Name: finovate-backend
   Environment: Node
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```

5. **Deploy** - Click "Create Web Service"

6. **Note Your Backend URL**
   ```
   Example: https://finovate-backend.onrender.com
   ```

---

## Part 3: Deploy Frontend (Vercel)

### 1. Prepare Frontend

Update `frontend/src/landing_page/signup/Signup.js`:
```javascript
// Replace localhost URLs with production URLs
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://finovate-backend.onrender.com';
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || 'https://finovate-dashboard.vercel.app';

// Line 55 and 67
axios.post(`${BACKEND_URL}/signup`, data)
axios.post(`${BACKEND_URL}/login`, data)

// Line 65 and 76
window.location.href = `${DASHBOARD_URL}?token=${res.data.token}&user=${userEncoded}`;
```

Create `frontend/.env.production`:
```env
REACT_APP_BACKEND_URL=https://finovate-backend.onrender.com
REACT_APP_DASHBOARD_URL=https://finovate-dashboard.vercel.app
```

### 2. Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Website**
   - Go to [Vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` folder as root directory

3. **Configure Build Settings**
   ```
   Framework Preset: Create React App
   Build Command: npm run build
   Output Directory: build
   Root Directory: frontend
   ```

4. **Add Environment Variables**
   ```
   REACT_APP_BACKEND_URL=https://finovate-backend.onrender.com
   REACT_APP_DASHBOARD_URL=https://finovate-dashboard.vercel.app
   ```

5. **Deploy** - Your frontend will be at:
   ```
   https://finovate.vercel.app
   ```

---

## Part 4: Deploy Dashboard (Vercel)

### 1. Prepare Dashboard

Update `dashboard/src/utils/axios.js`:
```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
});
```

Update `dashboard/src/components/Home.js`:
```javascript
// Line 20 - Update redirect URL
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3001';
window.location.href = `${FRONTEND_URL}/signup`;
```

Update all other components that have hardcoded URLs.

Create `dashboard/.env.production`:
```env
REACT_APP_BACKEND_URL=https://finovate-backend.onrender.com
REACT_APP_FRONTEND_URL=https://finovate.vercel.app
```

### 2. Deploy to Vercel

1. **Create New Project** on Vercel
2. **Import Repository** (same repo, different root)
3. **Configure**
   ```
   Framework: Create React App
   Root Directory: dashboard
   Build Command: npm run build
   Output Directory: build
   ```

4. **Add Environment Variables**
   ```
   REACT_APP_BACKEND_URL=https://finovate-backend.onrender.com
   REACT_APP_FRONTEND_URL=https://finovate.vercel.app
   ```

5. **Deploy** - Your dashboard will be at:
   ```
   https://finovate-dashboard.vercel.app
   ```

---

## Part 5: Update CORS Settings

Update `backend/index.js`:
```javascript
const cors = require("cors");

const allowedOrigins = [
  'https://finovate.vercel.app',
  'https://finovate-dashboard.vercel.app',
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

Redeploy backend after this change.

---

## Part 6: Configure Custom Domains (Optional)

### Using Vercel Custom Domain

1. **Buy Domain** (Namecheap, GoDaddy, etc.)
   ```
   Example: finovate.com
   ```

2. **Add to Vercel**
   - Go to Project Settings → Domains
   - Add domain: `finovate.com`
   - Add domain: `dashboard.finovate.com`

3. **Update DNS Records**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com

   Type: CNAME
   Name: dashboard
   Value: cname.vercel-dns.com
   ```

---

## Environment Variables Summary

### Backend (.env)
```env
MONGODB_URL=mongodb+srv://...
JWT_SECRET=minimum_32_character_secret_key
NODE_ENV=production
PORT=8000
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
REACT_APP_DASHBOARD_URL=https://dashboard.your-domain.com
```

### Dashboard (.env)
```env
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
REACT_APP_FRONTEND_URL=https://your-domain.com
```

---

## Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed to Render with environment variables
- [ ] Backend CORS configured for production domains
- [ ] Frontend environment variables updated
- [ ] Frontend deployed to Vercel
- [ ] Dashboard environment variables updated
- [ ] Dashboard deployed to Vercel
- [ ] Test signup flow end-to-end
- [ ] Test login and token persistence
- [ ] Test buy/sell functionality
- [ ] Verify all API calls work
- [ ] Check responsive design on mobile

---

## Troubleshooting

### Issue: CORS Errors
**Solution:** Make sure backend CORS allows your frontend/dashboard domains

### Issue: Environment Variables Not Working
**Solution:** Redeploy after adding environment variables

### Issue: MongoDB Connection Failed
**Solution:** Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)

### Issue: Token Not Persisting
**Solution:** Check that URLs match between frontend and dashboard

### Issue: 404 on React Routes
**Solution:** Add `vercel.json` for SPA routing (see below)

---

## Additional Files Needed

### Frontend & Dashboard: `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Backend: `.gitignore`
```
node_modules/
.env
.env.local
.env.production
```

---

## Cost Estimate

### Free Tier (Perfect for Demo/Portfolio)
- MongoDB Atlas: Free (512MB)
- Render Backend: Free (will sleep after 15 min inactivity)
- Vercel Frontend/Dashboard: Free (unlimited)
- **Total: $0/month**

### Production Tier
- MongoDB Atlas: $9/month (Shared)
- Render Backend: $7/month (always on)
- Vercel Pro: $20/month (team features)
- Domain: $12/year
- **Total: ~$16/month + domain**

---

## Next Steps

1. Follow this guide step by step
2. Test thoroughly after each deployment
3. Set up monitoring (optional)
4. Configure analytics (optional)
5. Add SSL certificates (automatic with Vercel/Render)

Good luck with your deployment! 🚀
