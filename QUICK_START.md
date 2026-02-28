# 🎯 Quick Start - GitHub & Vercel Deployment

## ✅ Current Status:
- ✅ Security configured (.gitignore setup)
- ✅ Environment templates created (.env.example files)
- ✅ Sensitive files protected (.env files will NOT be committed)
- ✅ Deployment guides ready

---

## 🚀 Quick Deployment (3 Steps)

### Step 1: Push to GitHub (5 minutes)

```powershell
# Run the automated script:
.\push-to-github.ps1
```

**Or manually:**
1. Create repo on GitHub: https://github.com/new
2. Run these commands:
   ```bash
   git init
   git add .
   git commit -m "Portfolio with Admin Panel"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Setup MongoDB Atlas (10 minutes)

1. **Create account:** https://www.mongodb.com/cloud/atlas/register
2. **Create free cluster** (M0 tier - Free forever)
3. **Database Access:**
   - Add user with password
   - Save the password!
4. **Network Access:**
   - Allow access from anywhere (0.0.0.0/0)
5. **Get connection string:**
   - Click "Connect" → "Connect your application"
   - Copy: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

---

### Step 3: Deploy to Vercel (10 minutes)

#### A. Backend Deployment:

1. Go to: https://vercel.com (sign up with GitHub)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. **Configuration:**
   - Framework: Other
   - Root Directory: `./`
   - Build Command: `cd backend && npm install`
5. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=generate_random_64_chars
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
6. Click "Deploy"
7. Save backend URL: `https://your-backend.vercel.app`

#### B. Frontend Deployment:

1. Create another Vercel project (same repo)
2. **Configuration:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Environment Variable:**
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```
4. Click "Deploy"
5. Save frontend URL: `https://your-frontend.vercel.app`

#### C. Update Backend CORS:

1. Go back to backend project on Vercel
2. Settings → Environment Variables
3. Update `FRONTEND_URL` with your frontend URL
4. Redeploy

#### D. Create Admin Account:

```powershell
$body = '{"username":"admin","email":"your@email.com","password":"YourStrongPassword123"}'
Invoke-RestMethod -Uri "https://your-backend.vercel.app/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

---

## 🎉 Done! Your Portfolio is Live!

- **Website:** https://your-frontend.vercel.app
- **Admin Panel:** https://your-frontend.vercel.app/admin/login
- **API:** https://your-backend.vercel.app/api

---

## 📚 Detailed Guides:

- **Full Deployment Guide:** `DEPLOYMENT_GUIDE.md`
- **Security Checklist:** `SECURITY_CHECKLIST.md`
- **Setup Instructions:** `README.md`

---

## 🔧 Useful Commands:

```powershell
# Security check before push:
.\security-check.ps1

# Push to GitHub:
.\push-to-github.ps1

# Generate JWT Secret:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})

# Test backend locally:
cd backend; node server.js

# Test frontend locally:
npm run dev
```

---

## ⚡ Auto-Deploy Setup:

Once connected to GitHub + Vercel:
1. Make code changes
2. `git commit -am "Your message"`
3. `git push`
4. ✨ Auto-deploys to Vercel!

---

## 🆘 Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Check `SECURITY_CHECKLIST.md` for security verification
3. Check Vercel deployment logs for errors
4. Check MongoDB Atlas connection status

---

**Start with:** `.\push-to-github.ps1`

**Good luck! 🚀**
