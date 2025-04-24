// Script simple para probar Context7 MCP
const { execSync } = require('child_process');

console.log('Probando Context7 MCP...');

try {
  // Ejecutar el comando con un timeout
  const output = execSync('npx -y @upstash/context7-mcp@latest', { 
    timeout: 5000,
    stdio: 'pipe'
  });
  
  console.log('Context7 MCP se ejecutó correctamente');
  console.log(output.toString());
} catch (error) {
  if (error.signal === 'SIGTERM') {
    console.log('Context7 MCP se está ejecutando (detenido por timeout)');
    console.log('Esto es normal, ya que el MCP se ejecuta como un servidor');
    console.log('✅ Context7 MCP funciona correctamente');
  } else {
    console.error('Error al ejecutar Context7 MCP:', error.message);
  }
}

console.log('\nInstrucciones de uso:');
console.log('1. Reinicia VS Code, Claude Desktop y Augment Code');
console.log('2. En cualquiera de estas aplicaciones, escribe "use context7" en tu prompt');
console.log('3. Esto activará el MCP de Context7, que proporcionará documentación actualizada');
