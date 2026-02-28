# 🔒 Security Checklist - Before GitHub Push

## ✅ Files That WILL BE COMMITTED (Safe):

### Source Code:
- ✅ All `.js`, `.jsx`, `.ts`, `.tsx` files
- ✅ All `.css` files
- ✅ `package.json` files
- ✅ Public images and assets
- ✅ README and documentation

### Configuration Templates (Safe):
- ✅ `.env.example` - Contains NO real secrets
- ✅ `.gitignore` - Excludes sensitive files
- ✅ `vercel.json` - Deployment config

---

## 🚫 Files That WILL NOT BE COMMITTED (Protected):

### Sensitive Files (Auto-Ignored):
- ❌ `.env` - Contains real secrets
- ❌ `backend/.env` - Contains real secrets
- ❌ `node_modules/` - Dependencies
- ❌ `dist/` - Build output
- ❌ `backend/uploads/*` - User uploads

---

## 🔍 Before Pushing - Manual Check:

### 1. Check .env Files:
```powershell
# Run this to verify .env files are ignored:
git status --ignored | Select-String ".env"
```

**Expected output:**
```
.env
backend/.env
```

If `.env` files show up in `git status` (not in ignored list), **STOP and fix .gitignore!**

---

### 2. Search for Hardcoded Secrets:

**Check for MongoDB connection strings:**
```powershell
Get-ChildItem -Recurse -File -Exclude node_modules,dist | Select-String "mongodb://" -List | Select-Object Path, LineNumber
```

**Check for JWT secrets:**
```powershell
Get-ChildItem -Recurse -File -Exclude node_modules,dist | Select-String "JWT_SECRET.*=" -List | Select-Object Path, LineNumber
```

**✅ Only these should appear:**
- `.env.example` files (with dummy values)
- Documentation files

**❌ If real secrets appear in code files:**
- Remove them immediately
- Use environment variables instead

---

### 3. Verify What Will Be Committed:

```powershell
# See all files that will be committed:
git add .
git status
```

**Look for:**
- ❌ `.env` files (should NOT be listed)
- ❌ `node_modules/` (should NOT be listed)
- ❌ Any files with passwords or API keys

**If you see sensitive files:**
```powershell
# Remove from staging:
git reset HEAD path/to/sensitive/file

# Add to .gitignore:
echo "path/to/sensitive/file" >> .gitignore
```

---

## 🛡️ Secrets to Change After Deployment:

### In Production MongoDB Atlas:
1. Create NEW database with DIFFERENT credentials
2. Use STRONG password (not "admin123")
3. Enable IP whitelist properly

### In Vercel Environment Variables:
1. Generate NEW JWT_SECRET (64+ characters random)
2. Use production MongoDB connection string
3. Set correct frontend/backend URLs

### First Admin Account:
1. Change password from "admin123" to strong password
2. Use real email address
3. Consider 2FA in future

---

## 🔐 Secure JWT Secret Generator:

Run this in PowerShell to generate secure JWT secret:

```powershell
# Generate 64-character random string:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

Copy output and use as `JWT_SECRET` in Vercel environment variables.

---

## ✅ Final Checklist Before Push:

- [ ] `.env` files are in `.gitignore`
- [ ] No hardcoded passwords in code
- [ ] No hardcoded MongoDB URLs in code  
- [ ] No hardcoded JWT secrets in code
- [ ] `.env.example` has dummy values only
- [ ] `node_modules/` excluded
- [ ] `README.md` doesn't contain secrets
- [ ] All sensitive data in environment variables

---

## 🚨 If You Accidentally Commit Secrets:

### ⚠️ IMPORTANT: Once pushed to GitHub, assume secrets are compromised!

**Immediate actions:**

1. **Delete the repository** (if public and contains secrets)

2. **Change all secrets immediately:**
   - MongoDB password
   - JWT secret
   - Any API keys

3. **Remove from Git history:**
   ```bash
   # Remove file from all commits (use carefully!)
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch path/to/secret/file" \
   --prune-empty --tag-name-filter cat -- --all
   
   # Force push (this rewrites history!)
   git push origin --force --all
   ```

4. **Better: Start fresh repository with clean history**

---

## 📚 Additional Security Resources:

1. **GitHub Secret Scanning:**
   - Enable in repo settings
   - Auto-detects leaked credentials

2. **Vercel Environment Variables:**
   - Never log env variables
   - Use Vercel's encrypted storage

3. **MongoDB Atlas Security:**
   - Enable IP whitelist
   - Use strong passwords
   - Enable audit logs

---

## ✅ You're Ready When:

- All sensitive files are excluded via `.gitignore`
- All secrets are in environment variables
- `.env.example` has no real values
- You've done a manual check for hardcoded secrets
- Production will use different credentials

**After verification, run:**
```powershell
.\push-to-github.ps1
```

---

**Remember: Once code is public on GitHub, assume anyone can see it. Never commit secrets!** 🔒
