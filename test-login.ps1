Write-Host "🧪 Testing Admin Login..." -ForegroundColor Cyan

$body = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    
    Write-Host "`n✅ Backend Login Successful!" -ForegroundColor Green
    Write-Host "`n📋 Response:" -ForegroundColor Yellow
    Write-Host "   Success: $($response.success)"
    Write-Host "   Message: $($response.message)"
    Write-Host "   Token: $($response.data.token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host "`n✅ Your login credentials are working!" -ForegroundColor Green
    Write-Host "`n🌐 Open Admin Panel:" -ForegroundColor Cyan
    Write-Host "   http://localhost:5174/admin/login" -ForegroundColor White
    Write-Host "`n🔑 Login with:" -ForegroundColor Cyan
    Write-Host "   Username: admin" -ForegroundColor White
    Write-Host "   Password: admin123" -ForegroundColor White
    
} catch {
    Write-Host "`n❌ Login Test Failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "`nMake sure:" -ForegroundColor White
    Write-Host "  1. Backend server is running (cd backend; node server.js)" -ForegroundColor Gray
    Write-Host "  2. MongoDB is running (check with: Get-Service MongoDB)" -ForegroundColor Gray
}
