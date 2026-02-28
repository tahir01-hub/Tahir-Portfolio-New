# GitHub Authentication Helper
Write-Host "`n🔑 GitHub Push Authentication Helper`n" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "❌ Problem Detected:" -ForegroundColor Red
Write-Host "   Repository: tahir443/Tahir-Portfolio" -ForegroundColor Gray
Write-Host "   Current login: tahir01-hub" -ForegroundColor Gray
Write-Host "   Access denied!`n" -ForegroundColor Red

Write-Host "✅ Solution: Use Personal Access Token`n" -ForegroundColor Green

Write-Host "📋 Steps to fix:`n" -ForegroundColor Yellow
Write-Host "1. Generate token at: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "   - Click 'Generate new token (classic)'" -ForegroundColor Gray
Write-Host "   - Select scope: repo (full control)" -ForegroundColor Gray
Write-Host "   - Generate and COPY the token`n" -ForegroundColor Gray

Write-Host "2. Enter your token below when prompted`n" -ForegroundColor White

# Open browser to token page
$openBrowser = Read-Host "Open token generation page in browser? (Y/N)"
if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
    Start-Process "https://github.com/settings/tokens/new?description=Portfolio-Deployment&scopes=repo"
    Write-Host "`n✅ Browser opened! Generate your token and copy it.`n" -ForegroundColor Green
    Write-Host "Press Enter when ready..." -ForegroundColor Yellow
    Read-Host
}

# Get token from user
Write-Host "`n🔑 Paste your Personal Access Token:" -ForegroundColor Cyan
Write-Host "(It will be hidden for security)`n" -ForegroundColor Gray
$token = Read-Host -AsSecureString "Token"

# Convert secure string to plain text
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$tokenPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

if ([string]::IsNullOrWhiteSpace($tokenPlain)) {
    Write-Host "`n❌ No token provided! Exiting..." -ForegroundColor Red
    exit 1
}

Write-Host "`n⚙️  Configuring Git remote with token..." -ForegroundColor Yellow

try {
    # Update remote URL with token
    git remote set-url origin "https://$tokenPlain@github.com/tahir443/Tahir-Portfolio.git"
    Write-Host "✅ Remote URL updated!" -ForegroundColor Green
    
    Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
    
    # Push to GitHub
    $pushOutput = git push -u origin main 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n🎉 SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
        Write-Host "`n📍 Repository: https://github.com/tahir443/Tahir-Portfolio" -ForegroundColor Cyan
        Write-Host "`n📘 Next Steps:" -ForegroundColor Yellow
        Write-Host "   1. Go to https://vercel.com" -ForegroundColor White
        Write-Host "   2. Import your GitHub repository" -ForegroundColor White
        Write-Host "   3. Follow DEPLOYMENT_GUIDE.md for Vercel setup" -ForegroundColor White
        Write-Host "`n✨ Your code is now on GitHub!" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Push failed!" -ForegroundColor Red
        Write-Host "Error: $pushOutput" -ForegroundColor Gray
        Write-Host "`nTry:" -ForegroundColor Yellow
        Write-Host "  1. Check if token has 'repo' scope" -ForegroundColor White
        Write-Host "  2. Verify token hasn't expired" -ForegroundColor White
        Write-Host "  3. Use GitHub Desktop instead (easier!)" -ForegroundColor White
    }
    
} catch {
    Write-Host "`n❌ Error occurred: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nRead GITHUB_AUTH_FIX.md for alternative methods." -ForegroundColor Yellow
} finally {
    # Clear token from memory
    Clear-Variable -Name tokenPlain -ErrorAction SilentlyContinue
    Clear-Variable -Name token -ErrorAction SilentlyContinue
    [System.GC]::Collect()
}
