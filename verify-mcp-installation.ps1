# Script para verificar la instalación de MCP en Windows 11

Write-Host "Verificando instalación de MCP en Windows 11" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar NPM
Write-Host "Verificando NPM..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "NPM instalado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: NPM no está instalado o no está en el PATH" -ForegroundColor Red
    exit 1
}

# Verificar variable de entorno GITHUB_TOKEN
Write-Host "Verificando variable de entorno GITHUB_TOKEN..." -ForegroundColor Yellow
$githubToken = [Environment]::GetEnvironmentVariable("GITHUB_TOKEN", "User")
if ($githubToken) {
    Write-Host "GITHUB_TOKEN configurado correctamente" -ForegroundColor Green
} else {
    Write-Host "ADVERTENCIA: GITHUB_TOKEN no está configurado" -ForegroundColor Yellow
    Write-Host "Algunas funcionalidades del MCP de GitHub pueden no funcionar correctamente" -ForegroundColor Yellow
}

# Verificar archivos de configuración
Write-Host "Verificando archivos de configuración..." -ForegroundColor Yellow

# VS Code
$vscodeConfigPath = "$env:USERPROFILE\AppData\Roaming\Code\User\mcp.json"
if (Test-Path $vscodeConfigPath) {
    Write-Host "VS Code MCP configurado en: $vscodeConfigPath" -ForegroundColor Green
} else {
    Write-Host "ERROR: No se encontró el archivo de configuración para VS Code" -ForegroundColor Red
    Write-Host "Ruta esperada: $vscodeConfigPath" -ForegroundColor Red
}

# Claude Desktop
$claudeConfigPath = "$env:USERPROFILE\AppData\Roaming\Claude\claude_desktop_config.json"
if (Test-Path $claudeConfigPath) {
    Write-Host "Claude Desktop MCP configurado en: $claudeConfigPath" -ForegroundColor Green
} else {
    Write-Host "ERROR: No se encontró el archivo de configuración para Claude Desktop" -ForegroundColor Red
    Write-Host "Ruta esperada: $claudeConfigPath" -ForegroundColor Red
}

# Augment Code
$augmentConfigPath = "augment-settings.json"
if (Test-Path $augmentConfigPath) {
    Write-Host "Augment Code MCP configurado en: $augmentConfigPath" -ForegroundColor Green
} else {
    Write-Host "ERROR: No se encontró el archivo de configuración para Augment Code" -ForegroundColor Red
    Write-Host "Ruta esperada: $augmentConfigPath" -ForegroundColor Red
}

# Probar MCP
Write-Host "Probando Context7 MCP..." -ForegroundColor Yellow
try {
    $process = Start-Process -FilePath "npx" -ArgumentList "-y", "@upstash/context7-mcp@latest" -NoNewWindow -PassThru
    Start-Sleep -Seconds 5
    if (!$process.HasExited -or $process.ExitCode -eq 0) {
        Write-Host "Context7 MCP funciona correctamente" -ForegroundColor Green
        if (!$process.HasExited) {
            Stop-Process -Id $process.Id -Force
        }
    } else {
        Write-Host "ERROR: Context7 MCP falló con código de salida $($process.ExitCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "ERROR al probar Context7 MCP: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Verificación completada" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Instrucciones de uso:" -ForegroundColor Yellow
Write-Host "1. Reinicia VS Code, Claude Desktop y Augment Code" -ForegroundColor White
Write-Host "2. En cualquiera de estas aplicaciones, escribe 'use context7' en tu prompt" -ForegroundColor White
Write-Host "3. Esto activará el MCP de Context7, que proporcionará documentación actualizada" -ForegroundColor White
Write-Host ""
Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
