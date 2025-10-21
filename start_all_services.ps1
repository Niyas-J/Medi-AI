# Medi-AI Suite - Start All Services
Write-Host "Starting Medi-AI Suite Services..." -ForegroundColor Green

# Start Flask Backend
Write-Host "`nStarting Flask Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\anees\OneDrive\Desktop\Medi-Ai\medi-ai-suite\packages\backend'; Write-Host 'Flask Backend Server' -ForegroundColor Cyan; python run.py"

# Wait for backend to initialize
Start-Sleep -Seconds 3

# Start Web Development Server
Write-Host "Starting Web Development Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\anees\OneDrive\Desktop\Medi-Ai\medi-ai-suite\packages\web'; Write-Host 'Web Development Server (Vite)' -ForegroundColor Cyan; npm run dev"

# Wait for web server to initialize
Start-Sleep -Seconds 3

# Start Mobile App (Expo)
Write-Host "Starting Mobile App (Expo)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\anees\OneDrive\Desktop\Medi-Ai\medi-ai-suite\packages\mobile'; Write-Host 'Mobile App (Expo)' -ForegroundColor Cyan; npm start"

# Wait for all services to start
Write-Host "`nWaiting for services to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Open Test Interface
Write-Host "`nOpening Test Interface..." -ForegroundColor Yellow
Start-Process "C:\Users\anees\OneDrive\Desktop\Medi-Ai\medi-ai-suite\test_app.html"

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Medi-AI Suite Services Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "`nServices:" -ForegroundColor Cyan
Write-Host "- Flask Backend: http://localhost:5000" -ForegroundColor White
Write-Host "- Web App: http://localhost:5173" -ForegroundColor White
Write-Host "- Mobile App: http://localhost:8081" -ForegroundColor White
Write-Host "- Test Interface: Opened in browser" -ForegroundColor White
Write-Host "`nPress any key to check service status..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Check service status
Write-Host "`nChecking service status..." -ForegroundColor Yellow
cd 'C:\Users\anees\OneDrive\Desktop\Medi-Ai\medi-ai-suite'
python test_services.py

Write-Host "`nAll services are running in separate windows." -ForegroundColor Green
Write-Host "Close this window when done. The service windows will remain open." -ForegroundColor Yellow

