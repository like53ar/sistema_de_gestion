Set WshShell = CreateObject("WScript.Shell")

' Matar procesos anteriores (Node.js/serve) para asegurar un puerto libre de forma silenciosa
WshShell.Run "cmd /c taskkill /F /IM node.exe", 0, True

' Iniciar el servidor estático en producción de forma silenciosa (ventana oculta = 0)
WshShell.Run "cmd /c serve -s dist/sistema-de-gestion/browser -p 4200", 0, False

' Esperar a que el servidor esté listo (apenas 1 segundo)
WScript.Sleep 1000

' Abrir el navegador automáticamente
WshShell.Run "http://localhost:4200"
