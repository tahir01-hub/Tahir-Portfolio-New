@echo off
echo ====================================
echo Portfolio Admin Panel Quick Start
echo ====================================
echo.

echo [1/4] Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b %errorlevel%
)

echo.
echo [2/4] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b %errorlevel%
)

echo.
echo [3/4] Creating admin account...
echo Please enter admin credentials:
echo.

set /p ADMIN_USERNAME="Enter admin username: "
set /p ADMIN_EMAIL="Enter admin email: "
set /p ADMIN_PASSWORD="Enter admin password: "

echo.
echo [4/4] Starting servers...
echo.

start "Backend Server" cmd /k "npm run dev"
cd ..
timeout /t 5 /nobreak >nul

start "Frontend Server" cmd /k "npm run dev"

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin/login
echo.
echo To create admin account, visit:
echo POST http://localhost:5000/api/auth/register
echo.
echo Or use the following curl command:
echo curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"username\":\"%ADMIN_USERNAME%\",\"email\":\"%ADMIN_EMAIL%\",\"password\":\"%ADMIN_PASSWORD%\"}"
echo.
pause
