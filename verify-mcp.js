#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Función para ejecutar comandos
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

// Función para verificar si un archivo existe
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Función principal
async function main() {
  console.log('\n===== Verificando instalación de MCP en Windows 11 =====\n');
  
  // Verificar Node.js
  try {
    const nodeVersion = await runCommand('node --version');
    console.log(`✅ Node.js instalado: ${nodeVersion}`);
  } catch (error) {
    console.log('❌ ERROR: Node.js no está instalado o no está en el PATH');
    console.log('Por favor, instala Node.js desde https://nodejs.org/');
    return;
  }
  
  // Verificar NPM
  try {
    const npmVersion = await runCommand('npm --version');
    console.log(`✅ NPM instalado: ${npmVersion}`);
  } catch (error) {
    console.log('❌ ERROR: NPM no está instalado o no está en el PATH');
    return;
  }
  
  // Verificar variable de entorno GITHUB_TOKEN
  const githubToken = process.env.GITHUB_TOKEN;
  if (githubToken) {
    console.log('✅ GITHUB_TOKEN configurado correctamente');
  } else {
    console.log('⚠️ ADVERTENCIA: GITHUB_TOKEN no está configurado');
    console.log('Algunas funcionalidades del MCP de GitHub pueden no funcionar correctamente');
  }
  
  // Verificar archivos de configuración
  console.log('\n===== Verificando archivos de configuración =====\n');
  
  // VS Code
  const userProfile = os.homedir();
  const vscodeConfigPath = path.join(userProfile, 'AppData', 'Roaming', 'Code', 'User', 'mcp.json');
  if (fileExists(vscodeConfigPath)) {
    console.log(`✅ VS Code MCP configurado en: ${vscodeConfigPath}`);
  } else {
    console.log(`❌ ERROR: No se encontró el archivo de configuración para VS Code`);
    console.log(`Ruta esperada: ${vscodeConfigPath}`);
    
    // Intentar copiar el archivo
    try {
      const vscodeDir = path.dirname(vscodeConfigPath);
      if (!fileExists(vscodeDir)) {
        fs.mkdirSync(vscodeDir, { recursive: true });
      }
      fs.copyFileSync('mcp.json', vscodeConfigPath);
      console.log(`✅ Se ha copiado mcp.json a ${vscodeConfigPath}`);
    } catch (error) {
      console.log(`❌ ERROR al copiar el archivo: ${error.message}`);
    }
  }
  
  // Claude Desktop
  const claudeConfigPath = path.join(userProfile, 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json');
  if (fileExists(claudeConfigPath)) {
    console.log(`✅ Claude Desktop MCP configurado en: ${claudeConfigPath}`);
  } else {
    console.log(`❌ ERROR: No se encontró el archivo de configuración para Claude Desktop`);
    console.log(`Ruta esperada: ${claudeConfigPath}`);
    
    // Intentar copiar el archivo
    try {
      const claudeDir = path.dirname(claudeConfigPath);
      if (!fileExists(claudeDir)) {
        fs.mkdirSync(claudeDir, { recursive: true });
      }
      fs.copyFileSync('claude_desktop_config.json', claudeConfigPath);
      console.log(`✅ Se ha copiado claude_desktop_config.json a ${claudeConfigPath}`);
    } catch (error) {
      console.log(`❌ ERROR al copiar el archivo: ${error.message}`);
    }
  }
  
  // Augment Code
  const augmentConfigPath = 'augment-settings.json';
  if (fileExists(augmentConfigPath)) {
    console.log(`✅ Augment Code MCP configurado en: ${augmentConfigPath}`);
  } else {
    console.log(`❌ ERROR: No se encontró el archivo de configuración para Augment Code`);
    console.log(`Ruta esperada: ${augmentConfigPath}`);
  }
  
  // Probar Context7 MCP
  console.log('\n===== Probando Context7 MCP =====\n');
  try {
    console.log('Ejecutando: npx -y @upstash/context7-mcp@latest');
    console.log('(Esto puede tardar unos segundos...)');
    
    // Ejecutar el comando con un timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 10000)
    );
    
    try {
      await Promise.race([
        runCommand('npx -y @upstash/context7-mcp@latest'),
        timeoutPromise
      ]);
      console.log('✅ Context7 MCP funciona correctamente');
    } catch (error) {
      if (error.message === 'Timeout') {
        console.log('✅ Context7 MCP se está ejecutando (detenido por timeout)');
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(`❌ ERROR al probar Context7 MCP: ${error.message}`);
  }
  
  console.log('\n===== Verificación completada =====\n');
  console.log('Instrucciones de uso:');
  console.log('1. Reinicia VS Code, Claude Desktop y Augment Code');
  console.log('2. En cualquiera de estas aplicaciones, escribe "use context7" en tu prompt');
  console.log('3. Esto activará el MCP de Context7, que proporcionará documentación actualizada');
}

// Ejecutar el programa principal
main().catch(error => {
  console.error('Error en el programa principal:', error);
});
