@echo off
cd /d "%~dp0"

:: Cerrar procesos anteriores si existen
taskkill /F /IM node.exe >nul 2>&1

:: Ejecutar el iniciador silencioso que lanza el splash y el servidor
start wscript.exe "iniciar_silencioso.vbs"
