Set WshShell = CreateObject("WScript.Shell")

' Iniciar el splash screen
WshShell.Run "mshta.exe """ & CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) & "\splash.hta""", 1, False

' Esperar un momento para que el splash se vea (opcional, el splash tiene su propio timer)
WScript.Sleep 500

' Iniciar npx ng serve de forma silenciosa (ventana oculta = 0)
WshShell.Run "cmd /c npx ng serve --port 4200", 0, False

' Esperar a que el servidor esté listo (aprox 15 segundos)
WScript.Sleep 15000

' Abrir el navegador automáticamente
WshShell.Run "http://localhost:4200"
