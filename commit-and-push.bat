@echo off
echo Forzando commit y push de los cambios de MCP en Windows 11

cd /d C:\GitHub\context7

echo.
echo Verificando estado de git...
git status

echo.
echo Realizando commit sin verificaciones...
git commit --no-verify -m "Implementación de MCP en Windows 11"

echo.
echo Realizando push...
git push

echo.
echo Proceso completado.
echo.
echo Presiona cualquier tecla para salir...
pause > nul
