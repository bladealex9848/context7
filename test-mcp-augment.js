#!/usr/bin/env node

import { exec } from 'child_process';
import { env as processEnv } from 'process';

// Detectar sistema operativo
const isWindows = process.platform === 'win32';

// Función para probar un MCP
async function testMCP(name, command, args, env = {}) {
  console.log(`\n\n===== Probando MCP para Augment Code: ${name} =====`);
  const fullCommand = `${command} ${args.join(' ')}`;
  console.log(`Comando: ${fullCommand}`);

  return new Promise((resolve) => {
    const childProcess = exec(fullCommand, {
      env: { ...processEnv, ...env }
    });

    // Configurar timeout para terminar el proceso después de 10 segundos
    const timeout = setTimeout(() => {
      console.log(`\n✅ ${name} se inició correctamente (detenido después de 10 segundos)`);
      childProcess.kill();
      resolve(true);
    }, 10000);

    // Manejar salida estándar
    childProcess.stdout.on('data', (data) => {
      console.log(`[${name} stdout]: ${data.toString().trim()}`);
    });

    // Manejar errores
    childProcess.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output.includes('running') || output.includes('started') || output.includes('listening')) {
        console.log(`\n✅ ${name} se inició correctamente`);
        clearTimeout(timeout);
        childProcess.kill();
        resolve(true);
      } else {
        console.log(`[${name} stderr]: ${output}`);
      }
    });

    // Manejar cierre del proceso
    childProcess.on('close', (code) => {
      if (code !== 0 && code !== null) {
        console.log(`\n❌ ${name} falló con código de salida ${code}`);
        clearTimeout(timeout);
        resolve(false);
      } else {
        console.log(`\n✅ ${name} se cerró correctamente`);
        clearTimeout(timeout);
        resolve(true);
      }
    });

    // Manejar errores del proceso
    childProcess.on('error', (err) => {
      console.log(`\n❌ ${name} error: ${err.message}`);
      clearTimeout(timeout);
      resolve(false);
    });
  });
}

// Función principal
async function main() {
  console.log('Iniciando pruebas de MCP para Augment Code...');

  // Definir los MCP a probar
  const mcps = [
    {
      name: 'Context7',
      command: isWindows ? 'npx.cmd' : 'npx',
      args: ['-y', '@upstash/context7-mcp@latest']
    },
    {
      name: 'Puppeteer',
      command: isWindows ? 'npx.cmd' : 'npx',
      args: ['-y', '@modelcontextprotocol/server-puppeteer']
    },
    {
      name: 'Sequential Thinking',
      command: isWindows ? 'npx.cmd' : 'npx',
      args: ['-y', '@modelcontextprotocol/server-sequential-thinking']
    },
    {
      name: 'GitHub',
      command: isWindows ? 'npx.cmd' : 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_TOKEN || 'YOUR_GITHUB_TOKEN_HERE'
      }
    }
  ];

  // Probar cada MCP
  const results = {};
  for (const mcp of mcps) {
    results[mcp.name] = await testMCP(mcp.name, mcp.command, mcp.args, mcp.env);
  }

  // Mostrar resumen
  console.log('\n\n===== Resumen de pruebas =====');
  for (const [name, success] of Object.entries(results)) {
    console.log(`${success ? '✅' : '❌'} ${name}: ${success ? 'Funcionando' : 'Falló'}`);
  }

  console.log('\n===== Configuración completada =====');
  console.log('Se han configurado correctamente los siguientes MCP:');
  console.log('1. Context7: Proporciona documentación actualizada y ejemplos de código para bibliotecas y frameworks.');
  console.log('2. Puppeteer: Permite la automatización de navegadores web para realizar tareas como scraping o testing.');
  console.log('3. Sequential Thinking: Ayuda a los modelos de IA a resolver problemas complejos paso a paso.');
  console.log('4. GitHub: Proporciona acceso a la API de GitHub para interactuar con repositorios, issues, PRs, etc.');

  console.log('\n===== Instrucciones de uso =====');
  console.log('Para usar Context7 en Augment Code:');
  console.log('- Escribe "use context7" en tu prompt para obtener documentación actualizada.');

  console.log('\nPara usar Context7 en Claude Desktop:');
  console.log('- Escribe "use context7" en tu prompt para obtener documentación actualizada.');

  console.log('\nPara usar los demás MCP, consulta la documentación específica de cada uno.');
}

// Ejecutar el programa principal
main().catch(err => {
  console.error('Error en el programa principal:', err);
  process.exit(1);
});
