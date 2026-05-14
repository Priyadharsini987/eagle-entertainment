@echo off
echo.
echo 🦅 Eagle Entertainment - Event Management
echo =========================================
echo.

echo Starting Spring Boot Backend...
start "Eagle Backend" cmd /k "cd backend && mvn spring-boot:run"

echo Waiting 30 seconds for backend to start...
timeout /t 30 /nobreak

echo.
echo Starting React Frontend...
start "Eagle Frontend" cmd /k "cd frontend && npm install && npm start"

echo.
echo ✅ Eagle Entertainment is starting!
echo.
echo    Website:      http://localhost:3000
echo    Admin Login:  http://localhost:3000/admin/login
echo    Backend API:  http://localhost:8080
echo    H2 Console:   http://localhost:8080/h2-console
echo.
echo    Admin credentials: admin / admin123
echo.
pause
