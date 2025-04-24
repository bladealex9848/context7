#!/usr/bin/env node

import { exec } from 'child_process';
import { env as processEnv } from 'process';

// Detectar sistema operativo
const isWindows = process.platform === 'win32';

// Función para probar Context7
async function testContext7() {
  console.log('\n===== Probando Context7 MCP =====');

  const command = isWindows ? 'npx.cmd' : 'npx';
  const args = ['-y', '@upstash/context7-mcp@latest'];
  const fullCommand = `${command} ${args.join(' ')}`;

  console.log(`Comando: ${fullCommand}`);

  return new Promise((resolve) => {
    const childProcess = exec(fullCommand, {
      env: { ...processEnv }
    });

    // Configurar timeout para terminar el proceso después de 10 segundos
    const timeout = setTimeout(() => {
      console.log('\n✅ Context7 se inició correctamente (detenido después de 10 segundos)');
      childProcess.kill();
      resolve(true);
    }, 10000);

    // Manejar salida estándar
    childProcess.stdout.on('data', (data) => {
      console.log(`[Context7 stdout]: ${data.toString().trim()}`);
    });

    // Manejar errores
    childProcess.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output.includes('running') || output.includes('started') || output.includes('listening')) {
        console.log('\n✅ Context7 se inició correctamente');
        clearTimeout(timeout);
        childProcess.kill();
        resolve(true);
      } else {
        console.log(`[Context7 stderr]: ${output}`);
      }
    });

    // Manejar cierre del proceso
    childProcess.on('close', (code) => {
      if (code !== 0 && code !== null) {
        console.log(`\n❌ Context7 falló con código de salida ${code}`);
        clearTimeout(timeout);
        resolve(false);
      } else {
        console.log('\n✅ Context7 se cerró correctamente');
        clearTimeout(timeout);
        resolve(true);
      }
    });

    // Manejar errores del proceso
    childProcess.on('error', (err) => {
      console.log(`\n❌ Context7 error: ${err.message}`);
      clearTimeout(timeout);
      resolve(false);
    });
  });
}

// Función principal
async function main() {
  console.log('Iniciando prueba específica de Context7 MCP...');

  const success = await testContext7();

  console.log('\n===== Resultado de la prueba =====');
  console.log(`${success ? '✅' : '❌'} Context7: ${success ? 'Funcionando' : 'Falló'}`);

  if (success) {
    console.log('\n===== Instrucciones de uso =====');
    console.log('Para usar Context7:');
    console.log('1. En VS Code: Escribe "use context7" en tu prompt');
    console.log('2. En Claude Desktop: Escribe "use context7" en tu prompt');
    console.log('3. En Augment Code: Escribe "use context7" en tu prompt');
    console.log('\nContext7 proporciona documentación actualizada y ejemplos de código para bibliotecas y frameworks.');
  } else {
    console.log('\n===== Solución de problemas =====');
    console.log('1. Verifica tu conexión a Internet');
    console.log('2. Asegúrate de tener Node.js instalado correctamente');
    console.log('3. Intenta ejecutar: npm install -g @upstash/context7-mcp');
    console.log('4. Si el problema persiste, consulta la documentación en: https://context7.com');
  }
}

// Ejecutar el programa principal
main().catch(err => {
  console.error('Error en el programa principal:', err);
  process.exit(1);
});
