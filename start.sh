#!/bin/bash
# Eagle Entertainment - Quick Start Script

echo ""
echo "🦅 Eagle Entertainment - Event Management"
echo "========================================="
echo ""

# Start Backend
echo "▶ Starting Spring Boot backend..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
echo "  Backend PID: $BACKEND_PID"

# Wait for backend to be ready
echo "  Waiting for backend to start (30s)..."
sleep 30

# Start Frontend
echo ""
echo "▶ Starting React frontend..."
cd ../frontend
npm install --silent
npm start &
FRONTEND_PID=$!
echo "  Frontend PID: $FRONTEND_PID"

echo ""
echo "✅ Eagle Entertainment is running!"
echo ""
echo "   🌐 Website:      http://localhost:3000"
echo "   🔐 Admin Login:  http://localhost:3000/admin/login"
echo "   ⚙️  Backend API:  http://localhost:8080"
echo "   🗄️  H2 Console:   http://localhost:8080/h2-console"
echo ""
echo "   Admin credentials: admin / admin123"
echo ""
echo "Press Ctrl+C to stop all services."

# Wait
wait $BACKEND_PID $FRONTEND_PID
