Set WshShell = CreateObject("WScript.Shell")

' Matar procesos anteriores (Node.js/serve) para asegurar un puerto libre de forma silenciosa
WshShell.Run "cmd /c taskkill /F /IM node.exe", 0, True

' Iniciar el servidor con node (soporta /api/shutdown para Cierre del Sistema)
WshShell.Run "cmd /c node server.js", 0, False

' Esperar a que el servidor esté listo (apenas 1 segundo)
WScript.Sleep 1000

' Abrir el navegador automáticamente
WshShell.Run "http://localhost:4200"
