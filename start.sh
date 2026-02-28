#!/bin/bash

echo "===================================="
echo "Portfolio Admin Panel Quick Start"
echo "===================================="
echo ""

echo "[1/4] Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies!"
    exit 1
fi

echo ""
echo "[2/4] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies!"
    exit 1
fi

echo ""
echo "[3/4] Seeding database (optional)..."
read -p "Do you want to seed the database with sample data? (y/n): " SEED_DB
if [ "$SEED_DB" == "y" ] || [ "$SEED_DB" == "Y" ]; then
    npm run seed
fi

echo ""
echo "[4/4] Starting servers..."
echo ""

# Start backend in background
npm run dev &
BACKEND_PID=$!

cd ..
sleep 3

# Start frontend in background
npm run dev &
FRONTEND_PID=$!

echo ""
echo "===================================="
echo "Setup Complete!"
echo "===================================="
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "Admin Panel: http://localhost:5173/admin/login"
echo ""
echo "To create admin account:"
echo "POST http://localhost:5000/api/auth/register"
echo ""
echo "Press Ctrl+C to stop servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
