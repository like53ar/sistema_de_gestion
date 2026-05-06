Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
ScriptDir = FSO.GetParentFolderName(WScript.ScriptFullName)

' Matar procesos anteriores (Node.js/serve) para asegurar un puerto libre de forma silenciosa
WshShell.Run "cmd /c taskkill /F /IM node.exe", 0, True

' Iniciar el splash screen (interfaz de carga)
WshShell.Run "mshta.exe """ & ScriptDir & "\splash.hta""", 1, False

' Iniciar el servidor con node (soporta /api/shutdown para Cierre del Sistema)
' Cambiamos al directorio del script para evitar problemas de rutas relativas en node
WshShell.CurrentDirectory = ScriptDir
WshShell.Run "cmd /c node server.js", 0, False

' Esperar a que el servidor esté listo (2 segundos para asegurar)
WScript.Sleep 2000

' Abrir el navegador automáticamente
WshShell.Run "http://localhost:4201"
