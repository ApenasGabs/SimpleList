#!/usr/bin/env node

/**
 * Script para instalar extensões do VS Code automaticamente
 *
 * Uso: node scripts/install-extensions.js [--required] [--recommended] [--optional] [--all]
 *
 * Opções:
 *   --required      Instala apenas extensões obrigatórias
 *   --recommended   Instala extensões obrigatórias + recomendadas
 *   --optional      Instala extensões obrigatórias + recomendadas + opcionais
 *   --all           Alias para --optional
 *   (padrão)        Instala apenas extensões obrigatórias
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  gray: '\x1b[90m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n');
  log(`${'='.repeat(60)}`, 'blue');
  log(` ${title}`, 'blue');
  log(`${'='.repeat(60)}`, 'blue');
}

function checkCode() {
  try {
    execSync('code --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    log('❌ VS Code não encontrado no PATH', 'red');
    log('Certifique-se de que VS Code está instalado e acessível via "code" no terminal', 'yellow');
    log('Instruções: https://code.visualstudio.com/docs/setup/setup-overview', 'gray');
    return false;
  }
}

function loadExtensions() {
  const extensionsPath = path.join(__dirname, '..', 'extensions.json');

  if (!fs.existsSync(extensionsPath)) {
    log(`❌ Arquivo não encontrado: ${extensionsPath}`, 'red');
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(extensionsPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    log(`❌ Erro ao ler extensions.json: ${error.message}`, 'red');
    process.exit(1);
  }
}

function getInstalledExtensions() {
  try {
    const output = execSync('code --list-extensions', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    return output
      .split('\n')
      .map((line) => line.trim().toLowerCase())
      .filter(Boolean);
  } catch (error) {
    log('⚠️  Erro ao listar extensões instaladas', 'yellow');
    return [];
  }
}

function getExtensionsToInstall(extensionsConfig, installType = 'required') {
  const all = [];

  if (installType === 'required' || installType === 'recommended' || installType === 'optional' || installType === 'all') {
    all.push(...(extensionsConfig.required || []));
  }

  if (installType === 'recommended' || installType === 'optional' || installType === 'all') {
    all.push(...(extensionsConfig.recommended || []));
  }

  if (installType === 'optional' || installType === 'all') {
    all.push(...(extensionsConfig.optional || []));
  }

  return all;
}

function installExtension(extensionId) {
  return new Promise((resolve) => {
    try {
      execSync(`code --install-extension ${extensionId}`, {
        stdio: 'ignore',
      });
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  });
}

async function installExtensions(extensions, installed) {
  const toInstall = extensions.filter(
    (ext) => !installed.includes(ext.id.toLowerCase())
  );

  if (toInstall.length === 0) {
    log('✅ Todas as extensões já estão instaladas!', 'green');
    return { success: toInstall.length, failed: 0 };
  }

  log(`\n📦 Instalando ${toInstall.length} extensão(ões)...`, 'yellow');

  let success = 0;
  let failed = 0;

  for (const ext of toInstall) {
    process.stdout.write(`  ${ext.name}... `);
    const result = await installExtension(ext.id);

    if (result) {
      log('✅', 'green');
      success++;
    } else {
      log('❌', 'red');
      failed++;
    }
  }

  return { success, failed };
}

function showSummary(extensions, installed, results) {
  logSection('Resumo');

  const alreadyInstalled = extensions.filter((ext) =>
    installed.includes(ext.id.toLowerCase())
  );

  log(`\n📊 Estatísticas:`, 'blue');
  log(`  Total de extensões: ${extensions.length}`);
  log(`  Já instaladas: ${alreadyInstalled.length}`, 'green');
  log(`  Acabadas de instalar: ${results.success}`, 'green');

  if (results.failed > 0) {
    log(`  Falhas: ${results.failed}`, 'red');
  }

  log(`\n✨ Extensões instaladas:`, 'green');
  const finalInstalled = getInstalledExtensions();
  extensions.forEach((ext) => {
    if (finalInstalled.includes(ext.id.toLowerCase())) {
      log(`  ✓ ${ext.name}`, 'green');
    }
  });

  if (extensions.length > 0) {
    const missing = extensions.filter(
      (ext) => !finalInstalled.includes(ext.id.toLowerCase())
    );

    if (missing.length > 0) {
      log(`\n⚠️  Extensões não instaladas:`, 'yellow');
      missing.forEach((ext) => {
        log(`  ✗ ${ext.name} (${ext.id})`, 'yellow');
      });

      log(
        '\n💡 Instale manualmente: https://marketplace.visualstudio.com/vscode',
        'gray'
      );
    }
  }

  log('\n🎉 Pronto! Abra ou recarregue o VS Code para ativar as extensões.', 'green');
  log('   Você pode precisar recarregar a janela com Ctrl+Shift+P → Developer: Reload Window\n', 'gray');
}

async function main() {
  logSection('Instalador de Extensões do VS Code');

  // Verificar argumentos
  const args = process.argv.slice(2);
  let installType = 'required';

  if (args.includes('--all')) {
    installType = 'all';
  } else if (args.includes('--optional')) {
    installType = 'optional';
  } else if (args.includes('--recommended')) {
    installType = 'recommended';
  } else if (args.includes('--required')) {
    installType = 'required';
  }

  log(`\n📋 Tipo de instalação: ${installType.toUpperCase()}`, 'blue');

  // Verificar se VS Code está disponível
  if (!checkCode()) {
    process.exit(1);
  }

  log('✅ VS Code encontrado', 'green');

  // Carregar extensões
  const extensionsConfig = loadExtensions();
  const extensions = getExtensionsToInstall(extensionsConfig, installType);

  log(`✅ Configuração carregada (${extensions.length} extensões)`, 'green');

  // Obter extensões instaladas
  const installed = getInstalledExtensions();
  log(`✅ ${installed.length} extensões já instaladas`, 'green');

  // Instalar extensões
  const results = await installExtensions(extensions, installed);

  // Mostrar resumo
  showSummary(extensions, installed, results);

  // Retornar código de saída apropriado
  process.exit(results.failed > 0 ? 1 : 0);
}

main().catch((error) => {
  log(`\n❌ Erro: ${error.message}`, 'red');
  process.exit(1);
});
