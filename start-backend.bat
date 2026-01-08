@echo off
echo Starting Backend Server...
cd /d "%~dp0server"
echo Current directory: %CD%
echo.
node src/server.js
pause
