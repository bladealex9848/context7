# Configuración de MCP para Windows 11

Este documento proporciona instrucciones para configurar Model Context Protocol (MCP) en Windows 11 para Visual Studio Code, Claude Desktop y Augment Code.

## Requisitos previos

- Windows 11
- Node.js y npm instalados
- Visual Studio Code
- Claude Desktop
- Augment Code
- Token de GitHub (opcional, para el MCP de GitHub)

## Pasos de instalación

### 1. Configurar la variable de entorno GITHUB_TOKEN (opcional)

Si deseas utilizar el MCP de GitHub, necesitas configurar un token de acceso personal:

1. Ejecuta el script `setup-env-windows.bat`:
   ```
   setup-env-windows.bat
   ```
2. Ingresa tu token de GitHub cuando se te solicite.
3. Reinicia tu terminal y aplicaciones para que los cambios surtan efecto.

### 2. Instalar las configuraciones de MCP

1. Ejecuta el script `install-mcp-windows.bat`:
   ```
   install-mcp-windows.bat
   ```
   
   Este script copiará los archivos de configuración a las ubicaciones correctas:
   - `mcp.json` → `%APPDATA%\Code\User\`
   - `claude_desktop_config.json` → `%APPDATA%\Claude\`

### 3. Probar la instalación

1. Ejecuta el script `run-tests-windows.bat` para verificar que todo funciona correctamente:
   ```
   run-tests-windows.bat
   ```

2. Para probar específicamente Context7, puedes ejecutar:
   ```
   node test-context7.js
   ```

## Archivos de configuración

### Visual Studio Code (`mcp.json`)

Ubicación: `%APPDATA%\Code\User\mcp.json`

```json
{
  "servers": {
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "puppeteer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Claude Desktop (`claude_desktop_config.json`)

Ubicación: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\%USERNAME%\\Downloads",
        "C:\\Users\\%USERNAME%\\Desktop",
        "C:\\GitHub"
      ]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Augment Code (`augment-settings.json`)

La configuración para Augment Code ya está incluida en el archivo `augment-settings.json`.

## Uso

### Context7

Para usar Context7 en cualquiera de las aplicaciones, simplemente escribe:

```
use context7
```

al inicio de tu prompt. Esto activará el MCP de Context7, que proporcionará documentación actualizada y ejemplos de código para bibliotecas y frameworks.

### Otros MCP

Para usar los demás MCP, consulta la documentación específica de cada uno.

## Solución de problemas

Si encuentras problemas con la instalación o el uso de los MCP:

1. Verifica que Node.js y npm estén instalados correctamente.
2. Asegúrate de que las variables de entorno estén configuradas correctamente.
3. Reinicia las aplicaciones después de realizar cambios en la configuración.
4. Verifica los logs de las aplicaciones para obtener más información sobre posibles errores.

## Recursos adicionales

- [Documentación oficial de Context7](https://context7.com)
- [Documentación de MCP](https://modelcontextprotocol.io)
- [Documentación de VS Code MCP](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
- [Documentación de Claude Desktop MCP](https://modelcontextprotocol.io/quickstart/user)
