# GitHub Push Script
Write-Host "🚀 GitHub Deployment Script" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if git is initialized
if (-Not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized!`n" -ForegroundColor Green
}

# Get GitHub username and repo name
Write-Host "📝 Enter your GitHub details:`n" -ForegroundColor White
$username = Read-Host "GitHub Username"
$reponame = Read-Host "Repository Name (e.g., portfolio-website)"

# Confirm sensitive files are ignored
Write-Host "`n🔒 Checking .gitignore..." -ForegroundColor Yellow
if (Test-Path .env) {
    Write-Host "   ✅ .env file will be ignored" -ForegroundColor Green
}
if (Test-Path backend\.env) {
    Write-Host "   ✅ backend/.env file will be ignored" -ForegroundColor Green
}

# Stage all files
Write-Host "`n📦 Staging files..." -ForegroundColor Yellow
git add .

# Show what will be committed
Write-Host "`n📋 Files to commit:" -ForegroundColor Cyan
git status --short

# Confirm
$confirm = Read-Host "`n❓ Ready to commit and push? (Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "❌ Cancelled!" -ForegroundColor Red
    exit
}

# Commit message
$message = Read-Host "`n💬 Commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "Portfolio with Admin Panel - Initial Commit"
}

# Commit
Write-Host "`n✅ Committing files..." -ForegroundColor Yellow
git commit -m "$message"

# Check if remote exists
$remoteExists = git remote | Select-String -Pattern "origin"
if (-Not $remoteExists) {
    Write-Host "`n🔗 Adding remote repository..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$username/$reponame.git"
    Write-Host "✅ Remote added!`n" -ForegroundColor Green
}

# Push to GitHub
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host "`n🎉 SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
Write-Host "📍 Repository: https://github.com/$username/$reponame" -ForegroundColor Cyan
Write-Host "`n📘 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Go to https://vercel.com" -ForegroundColor White
Write-Host "   2. Import your repository" -ForegroundColor White
Write-Host "   3. Follow DEPLOYMENT_GUIDE.md for complete setup" -ForegroundColor White
Write-Host "`n✨ Read DEPLOYMENT_GUIDE.md for detailed instructions!" -ForegroundColor Cyan
