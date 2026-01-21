@echo off
cd /d "%~dp0"
echo Limpiando procesos anteriores...
:: Intentar cerrar cualquier proceso de Node.js que haya quedado colgado
taskkill /F /IM node.exe >nul 2>&1

echo Iniciando Sistema Sabia...
:: Iniciar el servidor nuevamente
call npx ng serve --open --port 4200
