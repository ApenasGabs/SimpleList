# Scripts do Projeto

Pasta contendo scripts úteis para desenvolvimento.

## 📦 install-extensions.js

Script para instalar automaticamente as extensões do VS Code recomendadas para este projeto.

### Uso

```bash
# Instala apenas extensões obrigatórias (padrão)
node scripts/install-extensions.js

# Instala extensões obrigatórias + recomendadas
node scripts/install-extensions.js --recommended

# Instala todas as extensões (obrigatórias + recomendadas + opcionais)
node scripts/install-extensions.js --all

# Ou use --optional (mesmo que --all)
node scripts/install-extensions.js --optional
```

### O que o script faz?

✅ Verifica se VS Code está instalado  
✅ Lê a lista de extensões em `extensions.json`  
✅ Verifica quais extensões você já tem  
✅ Instala automaticamente as que faltam  
✅ Mostra relatório final com status  

### Exemplo de Saída

```
============================================================
 Instalador de Extensões do VS Code
============================================================

📋 Tipo de instalação: RECOMMENDED

✅ VS Code encontrado
✅ Configuração carregada (7 extensões)
✅ 3 extensões já instaladas

📦 Instalando 4 extensão(ões)...
  ESLint... ✅
  Prettier... ✅
  ES7+ React/Redux/React-Native snippets... ✅
  Vitest... ✅

============================================================
 Resumo
============================================================

📊 Estatísticas:
  Total de extensões: 7
  Já instaladas: 3
  Acabadas de instalar: 4
  Falhas: 0

✨ Extensões instaladas:
  ✓ ESLint
  ✓ Prettier
  ✓ Tailwind CSS IntelliSense
  ✓ ES7+ React/Redux/React-Native snippets
  ✓ Vitest

🎉 Pronto! Abra ou recarregue o VS Code para ativar as extensões.
```

### Pré-requisitos

- **VS Code** instalado e acessível via comando `code` no terminal
- **Node.js** (para executar o script)

### Troubleshooting

**Erro: "VS Code não encontrado no PATH"**

Adicione VS Code ao PATH:

- **Windows**: Instale VS Code e marque "Add to PATH"
- **macOS**: Execute `Shell Command: Install 'code' command in PATH` no VS Code (`Cmd+Shift+P`)
- **Linux**: O comando geralmente já está disponível após instalação

**Erro: "Extension not found"**

Verifique se o ID da extensão está correto em `extensions.json`.

### Referência

Veja [docs/EXTENSIONS.md](../docs/EXTENSIONS.md) para lista completa de extensões.
