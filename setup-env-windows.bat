@echo off
echo Configurando variables de entorno para MCP en Windows

set /p GITHUB_TOKEN="Ingresa tu token de GitHub: "

echo.
echo Configurando variable de entorno GITHUB_TOKEN...
setx GITHUB_TOKEN "%GITHUB_TOKEN%"

echo.
echo Variable de entorno configurada correctamente.
echo.
echo Para que los cambios surtan efecto, reinicia tu terminal y aplicaciones.
echo.
echo Recuerda que debes copiar los archivos de configuración a las ubicaciones correctas:
echo.
echo 1. Para VS Code: Copia mcp.json a %%APPDATA%%\Code\User\
echo 2. Para Claude Desktop: Copia claude_desktop_config.json a %%APPDATA%%\Claude\
echo.
echo Presiona cualquier tecla para salir...
pause > nul
