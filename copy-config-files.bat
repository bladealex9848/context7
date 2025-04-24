@echo off
echo Copiando archivos de configuracion MCP

set CODE_DIR=%USERPROFILE%\AppData\Roaming\Code\User
set CLAUDE_DIR=%USERPROFILE%\AppData\Roaming\Claude

echo Creando directorios si no existen...
if not exist "%CODE_DIR%" mkdir "%CODE_DIR%"
if not exist "%CLAUDE_DIR%" mkdir "%CLAUDE_DIR%"

echo Copiando archivos...
copy /Y "mcp.json" "%CODE_DIR%\"
copy /Y "claude_desktop_config.json" "%CLAUDE_DIR%\"

echo Verificando archivos copiados...
if exist "%CODE_DIR%\mcp.json" (
    echo VS Code MCP configurado correctamente en: %CODE_DIR%\mcp.json
) else (
    echo ERROR: No se pudo copiar mcp.json a %CODE_DIR%
)

if exist "%CLAUDE_DIR%\claude_desktop_config.json" (
    echo Claude Desktop MCP configurado correctamente en: %CLAUDE_DIR%\claude_desktop_config.json
) else (
    echo ERROR: No se pudo copiar claude_desktop_config.json a %CLAUDE_DIR%
)

echo.
echo Proceso completado.
pause
