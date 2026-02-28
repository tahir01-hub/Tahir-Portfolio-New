# 🚀 Vercel Deployment - Step by Step Fix

## ❌ Current Problem:
Backend aur Frontend ek saath deploy ho rahe hain jo Vercel pe kaam nahi karta.

## ✅ Solution: Separate Deployments

---

## 📋 Part 1: Delete Failed Deployment

1. Go to: https://vercel.com/dashboard
2. Click on failed project
3. Settings → Delete Project
4. Confirm deletion

---

## 🎯 Part 2: Deploy Frontend (Main Portfolio)

### Step 1: Create New Project

1. Go to: https://vercel.com/new
2. Import `tahir01-hub/Tahir-Portfolio-New`
3. Click "Import"

### Step 2: Configure Frontend

**Framework Preset:** Vite

**Root Directory:** `./` (leave default)

**Build Command:** 
```
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install
```

### Step 3: Environment Variables

Add this variable (leave backend URL empty for now):

```
VITE_API_URL = 
```

We'll update this after backend deployment.

### Step 4: Deploy

Click **"Deploy"**

Wait 2-3 minutes for deployment.

Save your frontend URL: `https://your-frontend.vercel.app`

---

## 🔧 Part 3: Deploy Backend (API)

### Step 1: Create Second Project

1. Go to: https://vercel.com/new
2. Import **SAME repository** `tahir01-hub/Tahir-Portfolio-New`
3. Click "Import"

### Step 2: Configure Backend

**Framework Preset:** Other

**Root Directory:** `backend` ⚠️ **IMPORTANT!**

**Build Command:**
```
npm install
```

**Output Directory:** (leave empty)

**Install Command:**
```
npm install
```

### Step 3: Environment Variables for Backend

Add these variables:

```
NODE_ENV = production

PORT = 5000

MONGODB_URI = your_mongodb_atlas_connection_string

JWT_SECRET = generate_secure_random_64_chars

FRONTEND_URL = https://your-frontend.vercel.app
```

**Generate JWT Secret:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**MongoDB URI from Atlas:**
- Format: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

### Step 4: Deploy Backend

Click **"Deploy"**

Save your backend URL: `https://your-backend.vercel.app`

---

## 🔗 Part 4: Connect Frontend to Backend

### Update Frontend Environment Variable

1. Go to frontend project on Vercel
2. Settings → Environment Variables
3. Edit `VITE_API_URL`:
   ```
   VITE_API_URL = https://your-backend.vercel.app/api
   ```
   (Use the backend URL from Part 3)

4. **Redeploy Frontend:**
   - Go to Deployments tab
   - Click ⋯ on latest deployment
   - Click "Redeploy"

---

## ✅ Part 5: Verification

### Test Backend API:
```powershell
Invoke-RestMethod "https://your-backend.vercel.app/api/projects"
```

### Test Frontend:
Open: `https://your-frontend.vercel.app`

### Test Admin Panel:
Open: `https://your-frontend.vercel.app/admin/login`

---

## 👤 Part 6: Create Admin Account

After both are deployed:

```powershell
$body = '{"username":"admin","email":"your@email.com","password":"YourStrongPass123"}'
Invoke-RestMethod -Uri "https://your-backend.vercel.app/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

---

## 🎉 Final URLs:

- **Portfolio:** https://your-frontend.vercel.app
- **Admin Panel:** https://your-frontend.vercel.app/admin/login  
- **API:** https://your-backend.vercel.app/api

---

## 🔧 Common Errors & Fixes:

### Error: "Cannot connect to database"
**Fix:** 
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify MONGODB_URI is correct

### Error: "CORS policy blocked"
**Fix:**
- Verify `FRONTEND_URL` in backend matches your frontend domain
- Redeploy backend after changing env variables

### Error: "Module not found"
**Fix:**
- Make sure Root Directory is set correctly
- Frontend: `./`
- Backend: `backend`

### Error: "Build failed"
**Fix:**
- Check if `npm run build` works locally
- Push latest code to GitHub
- Vercel will auto-redeploy

---

## 📝 Summary:

| Project | Root Dir | Build Command | Env Variables |
|---------|----------|---------------|---------------|
| **Frontend** | `./` | `npm run build` | `VITE_API_URL` |
| **Backend** | `backend` | `npm install` | `NODE_ENV`, `PORT`, `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL` |

---

## 🔄 Auto-Deploy:

Once setup:
1. Push to GitHub: `git push`
2. Vercel auto-deploys both! ✨

---

## ⚠️ Important Notes:

1. **Separate Deployments** - Frontend aur backend alag se deploy hote hain
2. **Root Directory** - Backend ke liye `backend` folder select karna zaruri hai
3. **Environment Variables** - Dono projects mein alag alag set karne hote hain
4. **MongoDB Atlas** - Local MongoDB nahi chalega, Atlas (cloud) use karna hai
5. **CORS** - Backend mein frontend ka URL correct hona chahiye

---

## 🆘 Still Having Issues?

1. Check Vercel deployment logs (Functions tab)
2. Check browser console for frontend errors
3. Check MongoDB Atlas connection status
4. Test API endpoints with Postman

---

**Follow these steps carefully and your portfolio will be live!** 🚀
