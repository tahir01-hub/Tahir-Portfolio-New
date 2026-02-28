# 🚀 GitHub & Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Files Ready for GitHub:
- [x] `.gitignore` - Sensitive files excluded
- [x] `.env.example` - Environment variable template (NO SECRETS)
- [x] `README.md` - Project documentation
- [x] All code files

### 🔒 Sensitive Files (NEVER COMMIT):
- ❌ `.env` files (auto-ignored)
- ❌ `node_modules/` (auto-ignored)
- ❌ Database credentials
- ❌ JWT secrets
- ❌ API keys

---

## 📤 Part 1: Push to GitHub

### Step 1: Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Portfolio with Admin Panel"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Name: `portfolio-website` (or your choice)
3. **DO NOT** initialize with README (we have one)
4. Click "Create repository"

### Step 3: Push to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git branch -M main
git push -u origin main
```

---

## 🌐 Part 2: Deploy to Vercel

### A. Deploy Backend (MongoDB Atlas + Vercel)

#### Step 1: Setup MongoDB Atlas (Free Cloud Database)

1. **Create MongoDB Atlas Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (free)

2. **Create Free Cluster:**
   - Click "Build a Database"
   - Choose "M0 Free" tier
   - Select region closest to you
   - Click "Create Cluster"

3. **Setup Database Access:**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `admin` (or your choice)
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access:**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your database password
   - Add database name at the end: `/portfolio`
   - Final format: `mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio`

#### Step 2: Deploy Backend to Vercel

1. **Create Vercel Account:**
   - Go to: https://vercel.com/signup
   - Sign up with GitHub

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Project:**
   - Framework Preset: "Other"
   - Root Directory: `./` (default)
   - Build Command: `cd backend && npm install`
   - Output Directory: Leave empty
   - Install Command: `npm install`

4. **Add Environment Variables:**
   Click "Environment Variables" and add these:
   
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
   JWT_SECRET = generate_a_random_secure_string_here
   FRONTEND_URL = https://your-frontend-domain.vercel.app
   ```

   **Generate JWT Secret:**
   ```bash
   # Run this in PowerShell to generate secure secret:
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL: `https://your-backend.vercel.app`

6. **Create Admin Account:**
   After deployment, create admin via API:
   ```powershell
   $body = '{"username":"admin","email":"admin@example.com","password":"YourSecurePassword123"}' 
   Invoke-RestMethod -Uri "https://your-backend.vercel.app/api/auth/register" -Method POST -Body $body -ContentType "application/json"
   ```

---

### B. Deploy Frontend

#### Step 1: Create New Vercel Project for Frontend

1. **Import Same Repository:**
   - Go to Vercel Dashboard
   - Click "Add New" → "Project"
   - Select same repository
   - Click "Import"

2. **Configure Frontend:**
   - Framework Preset: "Vite"
   - Root Directory: `./` (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variable:**
   ```
   VITE_API_URL = https://your-backend.vercel.app/api
   ```
   (Use the backend URL from previous step)

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment
   - Your portfolio is live! 🎉

#### Step 2: Update Backend CORS

Go back to your backend Vercel project:
1. Settings → Environment Variables
2. Update `FRONTEND_URL` to your frontend URL:
   ```
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
3. Redeploy backend (Deployments → click ⋯ → Redeploy)

---

## 🔄 Auto-Deploy Updates

Once connected to GitHub:
1. Make changes locally
2. Commit: `git commit -am "Your update message"`
3. Push: `git push`
4. Vercel automatically deploys! ✨

---

## 🧪 Verify Deployment

### Test Backend:
```bash
curl https://your-backend.vercel.app/api/projects
```

### Test Frontend:
Open: `https://your-frontend.vercel.app`

### Test Admin Panel:
Open: `https://your-frontend.vercel.app/admin/login`

---

## 📝 Custom Domain (Optional)

### Add Custom Domain to Vercel:

1. Go to your Vercel project → "Settings" → "Domains"
2. Add your domain (e.g., `portfolio.com`)
3. Update DNS records at your domain registrar:
   - Type: `A` → Value: `76.76.21.21`
   - Type: `CNAME` → Name: `www` → Value: `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)

---

## 🔧 Troubleshooting

### Error: "Cannot connect to database"
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string is correct
- Check database user password

### Error: "CORS policy blocked"
- Verify `FRONTEND_URL` in backend matches frontend domain
- Redeploy backend after changing env variables

### Error: "Module not found"
- Check `package.json` includes all dependencies
- Run `npm install` locally and test before pushing

---

## 📧 Need Help?

1. Check Vercel deployment logs
2. Check MongoDB Atlas connection logs
3. Test backend endpoints with Postman
4. Check browser console for frontend errors

---

## 🎉 Success!

Your portfolio is now live on:
- Frontend: `https://your-domain.vercel.app`
- Admin Panel: `https://your-domain.vercel.app/admin/login`
- Backend API: `https://your-backend.vercel.app/api`

**Star ⭐ your repository if satisfied!**
