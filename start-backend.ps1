# PowerShell script to start the backend server
Write-Host "Starting Backend Server..." -ForegroundColor Green
Set-Location "$PSScriptRoot\server"
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""
node src/server.js
