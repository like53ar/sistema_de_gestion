Set WshShell = CreateObject("WScript.Shell")
Set Shortcut = WshShell.CreateShortcut("C:\Users\fabar\OneDrive\Escritorio\Sabia - Sistema de Gestion.lnk")
Shortcut.TargetPath = "wscript.exe"
Shortcut.Arguments = """C:\Users\fabar\OneDrive\Escritorio\sistema_de_gestion\iniciar_silencioso.vbs"""
Shortcut.WorkingDirectory = "C:\Users\fabar\OneDrive\Escritorio\sistema_de_gestion"
Shortcut.IconLocation = "C:\Users\fabar\OneDrive\Escritorio\sistema_de_gestion\sabia_icon.ico"
Shortcut.WindowStyle = 1
Shortcut.Save
