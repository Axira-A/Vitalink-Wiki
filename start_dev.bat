@echo off
echo Vitalink Wiki Dev Launcher
echo ========================

REM Try to find Node.js in common locations and add to PATH temporarily
IF EXIST "C:\Program Files\nodejs\node.exe" SET PATH=%PATH%;C:\Program Files\nodejs\
IF EXIST "C:\Program Files (x86)\nodejs\node.exe" SET PATH=%PATH%;C:\Program Files (x86)\nodejs\

REM Check if Node is available
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not found in your PATH.
    echo Please install Node.js from https://nodejs.org/
    echo If you have installed it, please restart this script or your computer.
    pause
    exit /b
)

echo Node.js found. Verifying dependencies...

REM Install Server Dependencies
if not exist "server\node_modules" (
    echo Installing Server Dependencies...
    cd server
    call npm install
    cd ..
)

REM Install Client Dependencies
if not exist "client\node_modules" (
    echo Installing Client Dependencies...
    cd client
    call npm install
    call npm install react-markdown remark-gfm lucide-react --save
    cd ..
)

REM Setup Database
echo Setting up Database...
cd server
call npx prisma generate
call npx prisma db push
cd ..

echo.
echo Starting Vitalink...
echo.

REM Start Server in a new window
start "Vitalink Server" cmd /k "cd server && npm start"

REM Start Client in a new window
start "Vitalink Client" cmd /k "cd client && npm run dev"

echo Application launched!
echo Server: http://localhost:3000
echo Client: http://localhost:5173
echo.
pause
