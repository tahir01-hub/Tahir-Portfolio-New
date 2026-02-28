# Script to create first admin account
Write-Host "🔐 Creating Admin Account..." -ForegroundColor Cyan

$username = Read-Host "Enter admin username"
$email = Read-Host "Enter admin email"
$password = Read-Host "Enter admin password" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

$body = @{
    username = $username
    email = $email
    password = $passwordPlain
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "`n✅ Admin account created successfully!" -ForegroundColor Green
    Write-Host "`n📋 Login Details:" -ForegroundColor Yellow
    Write-Host "   Username: $username"
    Write-Host "   Email: $email"
    Write-Host "`n🌐 Admin Panel: http://localhost:5174/admin/login" -ForegroundColor Cyan
} catch {
    Write-Host "`n❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nMake sure the backend server is running!" -ForegroundColor Yellow
}
