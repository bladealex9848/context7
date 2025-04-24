@echo off
echo Instalando configuraciones de MCP para Windows

echo.
echo Creando directorios si no existen...
if not exist "%APPDATA%\Code\User\" mkdir "%APPDATA%\Code\User\"
if not exist "%APPDATA%\Claude\" mkdir "%APPDATA%\Claude\"

echo.
echo Copiando archivos de configuración...
copy /Y "mcp.json" "%APPDATA%\Code\User\"
copy /Y "claude_desktop_config.json" "%APPDATA%\Claude\"

echo.
echo Instalación completada.
echo.
echo Los archivos se han copiado a:
echo 1. VS Code: %APPDATA%\Code\User\mcp.json
echo 2. Claude Desktop: %APPDATA%\Claude\claude_desktop_config.json
echo.
echo Recuerda configurar la variable de entorno GITHUB_TOKEN ejecutando setup-env-windows.bat
echo.
echo Presiona cualquier tecla para salir...
pause > nul
