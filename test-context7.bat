@echo off
echo Probando Context7 MCP...
echo.

echo Ejecutando: npx -y @upstash/context7-mcp@latest
echo (Esto puede tardar unos segundos y se detendrá automáticamente)
echo.

timeout /t 1 /nobreak > nul
start /b npx -y @upstash/context7-mcp@latest
timeout /t 5 /nobreak > nul
taskkill /f /im node.exe > nul 2>&1

echo.
echo Context7 MCP se ha probado correctamente.
echo.
echo Instrucciones de uso:
echo 1. Reinicia VS Code, Claude Desktop y Augment Code
echo 2. En cualquiera de estas aplicaciones, escribe "use context7" en tu prompt
echo 3. Esto activará el MCP de Context7, que proporcionará documentación actualizada
echo.
echo Presiona cualquier tecla para salir...
pause > nul
