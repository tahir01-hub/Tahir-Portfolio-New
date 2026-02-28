# GitHub Upload - Fresh Setup (No LFS Issues)
Write-Host "`n🔧 Fresh GitHub Setup (LFS Issues se bachne ke liye)`n" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "📋 Steps:`n" -ForegroundColor Yellow
Write-Host "1. GitHub pe repository delete karo (optional)" -ForegroundColor White
Write-Host "   URL: https://github.com/tahir01-hub/Tahir-Portfolio/settings" -ForegroundColor Gray
Write-Host "   Scroll down → Danger Zone → Delete Repository`n" -ForegroundColor Gray

Write-Host "2. Ya new repository banao:" -ForegroundColor White
Write-Host "   URL: https://github.com/new" -ForegroundColor Gray
Write-Host "   Name: Tahir-Portfolio-New (or any name)`n" -ForegroundColor Gray

$newRepo = Read-Host "New repository URL (e.g., https://github.com/tahir01-hub/Tahir-Portfolio-New.git)"

if ([string]::IsNullOrWhiteSpace($newRepo)) {
    Write-Host "`n❌ No URL provided! Exiting..." -ForegroundColor Red
    exit 1
}

Write-Host "`n⚙️  Setting up fresh repository...`n" -ForegroundColor Yellow

try {
    # Remove old .git folder
    Write-Host "1️⃣  Removing old Git history..." -ForegroundColor Cyan
    if (Test-Path .git) {
        Remove-Item .git -Recurse -Force
        Write-Host "   ✅ Old history removed" -ForegroundColor Green
    }
    
    # Initialize fresh Git
    Write-Host "`n2️⃣  Initializing fresh Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "   ✅ Git initialized" -ForegroundColor Green
    
    # Add all files (excluding .gitignore patterns)
    Write-Host "`n3️⃣  Adding files..." -ForegroundColor Cyan
    git add .
    Write-Host "   ✅ Files added" -ForegroundColor Green
    
    # First commit
    Write-Host "`n4️⃣  Creating commit..." -ForegroundColor Cyan
    git commit -m "Initial commit: Portfolio with Admin Panel"
    Write-Host "   ✅ Committed" -ForegroundColor Green
    
    # Set branch to main
    Write-Host "`n5️⃣  Setting branch to main..." -ForegroundColor Cyan
    git branch -M main
    Write-Host "   ✅ Branch set" -ForegroundColor Green
    
    # Add remote
    Write-Host "`n6️⃣  Adding remote repository..." -ForegroundColor Cyan
    git remote add origin $newRepo
    Write-Host "   ✅ Remote added" -ForegroundColor Green
    
    # Push to GitHub
    Write-Host "`n7️⃣  Pushing to GitHub..." -ForegroundColor Cyan
    git push -u origin main
    
    Write-Host "`n🎉 SUCCESS! Code uploaded to GitHub!" -ForegroundColor Green
    Write-Host "`n📍 Repository: $newRepo" -ForegroundColor Cyan
    Write-Host "`n📘 Next Steps:" -ForegroundColor Yellow
    Write-Host "   1. Setup MongoDB Atlas (free)" -ForegroundColor White
    Write-Host "   2. Deploy to Vercel" -ForegroundColor White
    Write-Host "   3. Follow DEPLOYMENT_GUIDE.md" -ForegroundColor White
    
} catch {
    Write-Host "`n❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nTry:" -ForegroundColor Yellow
    Write-Host "  1. Make sure repository exists on GitHub" -ForegroundColor White
    Write-Host "  2. Check repository URL is correct" -ForegroundColor White
    Write-Host "  3. Use GitHub Desktop instead (easiest!)" -ForegroundColor White
}

Write-Host "`n" -ForegroundColor White
