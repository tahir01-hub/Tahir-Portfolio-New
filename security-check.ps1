# Quick Security Check Script
Write-Host "`n🔒 Security Check - Before GitHub Push`n" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$issues = 0

# Check 1: .gitignore exists
Write-Host "1️⃣  Checking .gitignore..." -ForegroundColor Yellow
if (Test-Path .gitignore) {
    $gitignoreContent = Get-Content .gitignore -Raw
    if ($gitignoreContent -match "\.env") {
        Write-Host "   ✅ .env files are ignored" -ForegroundColor Green
    } else {
        Write-Host "   ❌ WARNING: .env not in .gitignore!" -ForegroundColor Red
        $issues++
    }
} else {
    Write-Host "   ❌ ERROR: .gitignore not found!" -ForegroundColor Red
    $issues++
}

# Check 2: .env files exist (they should exist but be ignored)
Write-Host "`n2️⃣  Checking .env files..." -ForegroundColor Yellow
if (Test-Path .env) {
    Write-Host "   ✅ Frontend .env exists (will be ignored)" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Frontend .env not found (should exist locally)" -ForegroundColor Yellow
}

if (Test-Path backend\.env) {
    Write-Host "   ✅ Backend .env exists (will be ignored)" -ForegroundColor Green  
} else {
    Write-Host "   ⚠️  Backend .env not found (should exist locally)" -ForegroundColor Yellow
}

# Check 3: .env.example files exist
Write-Host "`n3️⃣  Checking .env.example files..." -ForegroundColor Yellow
if (Test-Path .env.example) {
    Write-Host "   ✅ Frontend .env.example exists" -ForegroundColor Green
} else {
    Write-Host "   ❌ Frontend .env.example missing!" -ForegroundColor Red
    $issues++
}

if (Test-Path backend\.env.example) {
    Write-Host "   ✅ Backend .env.example exists" -ForegroundColor Green
} else {
    Write-Host "   ❌ Backend .env.example missing!" -ForegroundColor Red
    $issues++
}

# Check 4: Search for hardcoded secrets
Write-Host "`n4️⃣  Searching for hardcoded secrets..." -ForegroundColor Yellow

$secretPatterns = @(
    @{Pattern="mongodb\+srv://.*:.*@"; Name="MongoDB connection string"},
    @{Pattern="mongodb://.*:.*@"; Name="MongoDB connection string with auth"}
)

$foundSecrets = $false
foreach ($pattern in $secretPatterns) {
    $found = Get-ChildItem -Path . -Recurse -File -Include *.js,*.jsx,*.ts,*.tsx,*.json -Exclude node_modules,dist,backend\node_modules,backend\dist |
        Select-String -Pattern $pattern.Pattern -List |
        Where-Object { $_.Path -notlike "*node_modules*" -and $_.Path -notlike "*.example*" -and $_.Path -notlike "*\.env" }
    
    if ($found) {
        Write-Host "   ⚠️  Found $($pattern.Name) in:" -ForegroundColor Yellow
        $found | ForEach-Object { Write-Host "      $($_.Path)" -ForegroundColor Gray }
        $foundSecrets = $true
    }
}

if (-not $foundSecrets) {
    Write-Host "   ✅ No hardcoded secrets found in code" -ForegroundColor Green
}

# Check 5: Verify git status
Write-Host "`n5️⃣  Checking Git status..." -ForegroundColor Yellow
if (Test-Path .git) {
    $gitStatus = git status --porcelain 2>&1
    $envInGit = $gitStatus | Select-String "\.env$"
    
    if ($envInGit) {
        Write-Host "   ❌ WARNING: .env files in git staging!" -ForegroundColor Red
        $envInGit | ForEach-Object { Write-Host "      $_" -ForegroundColor Gray }
        $issues++
    } else {
        Write-Host "   ✅ .env files not staged for commit" -ForegroundColor Green
    }
} else {
    Write-Host "   ℹ️  Git not initialized yet" -ForegroundColor Blue
}

# Final verdict
Write-Host "`n========================================`n" -ForegroundColor Cyan
if ($issues -eq 0) {
    Write-Host "✅ SECURITY CHECK PASSED!" -ForegroundColor Green
    Write-Host "`n🚀 Safe to push to GitHub!" -ForegroundColor Cyan
    Write-Host "`nRun: .\push-to-github.ps1" -ForegroundColor White
} else {
    Write-Host "❌ SECURITY ISSUES FOUND: $issues" -ForegroundColor Red
    Write-Host "`n⚠️  DO NOT PUSH TO GITHUB YET!" -ForegroundColor Yellow
    Write-Host "`nFix the issues above first, then run this check again." -ForegroundColor White
}

Write-Host ""
