@echo off
echo Ejecutando pruebas de MCP en Windows

echo.
echo Verificando Node.js...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js no está instalado o no está en el PATH.
    echo Por favor, instala Node.js desde https://nodejs.org/
    exit /b 1
)

echo.
echo Verificando NPM...
npm --version
if %ERRORLEVEL% NEQ 0 (
    echo Error: NPM no está instalado o no está en el PATH.
    exit /b 1
)

echo.
echo Verificando variable de entorno GITHUB_TOKEN...
if "%GITHUB_TOKEN%"=="" (
    echo Advertencia: La variable GITHUB_TOKEN no está configurada.
    echo Algunas pruebas pueden fallar. Ejecuta setup-env-windows.bat para configurarla.
)

echo.
echo Ejecutando prueba de Context7...
node test-context7.js
if %ERRORLEVEL% NEQ 0 (
    echo Error al ejecutar la prueba de Context7.
    exit /b 1
)

echo.
echo Ejecutando pruebas para VS Code...
node test-mcp.js
if %ERRORLEVEL% NEQ 0 (
    echo Error al ejecutar las pruebas para VS Code.
    exit /b 1
)

echo.
echo Ejecutando pruebas para Augment Code...
node test-mcp-augment.js
if %ERRORLEVEL% NEQ 0 (
    echo Error al ejecutar las pruebas para Augment Code.
    exit /b 1
)

echo.
echo Todas las pruebas completadas.
echo.
echo Recuerda ejecutar install-mcp-windows.bat para instalar las configuraciones.
echo.
echo Presiona cualquier tecla para salir...
pause > nul
