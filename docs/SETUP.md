# Guia de Configuração do Template

Este documento lista todas as configurações necessárias ao usar este template.

## 1. Configuração Inicial

### Clonar o Template

```bash
# Usando GitHub CLI
gh repo create meu-projeto --template ApenasGabs/ApenasTemplate --clone

# Ou manualmente
git clone https://github.com/ApenasGabs/ApenasTemplate.git meu-projeto
cd meu-projeto
```

### Instalar Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## 2. Configuração do Projeto

### Atualizar package.json

```json
{
  "name": "seu-projeto",
  "version": "0.1.0",
  "description": "Sua descrição",
  "author": "Seu Nome",
  "repository": {
    "type": "git",
    "url": "https://github.com/seu-usuario/seu-projeto"
  }
}
```

### Atualizar README.md

- [ ] Alterar título do projeto
- [ ] Atualizar descrição
- [ ] Modificar badges se necessário
- [ ] Atualizar links de repositório

## 3. GitHub Actions / CI/CD

### Configurar Permissões

**Para Releases Automáticas:**

1. Vá em **Settings** → **Actions** → **General**
2. Em "Workflow permissions":
   - ✅ Selecione **Read and write permissions**
   - ✅ Marque **Allow GitHub Actions to create and approve pull requests**

### Secrets Necessários

**Opcional - Deploy:**
Se for fazer deploy, adicione em **Settings** → **Secrets**:

- `VERCEL_TOKEN` (para Vercel)
- `NETLIFY_AUTH_TOKEN` (para Netlify)
- etc.

## 4. Configuração de Testes

### Playwright (E2E)

Instalar browsers:

```bash
npx playwright install
```

Para CI, já está configurado no workflow.

### Vitest (Unit)

Funciona out-of-the-box, sem configuração adicional.

## 5. ESLint e Prettier

### Configurar IDE

**VS Code:**
Instale extensões:

- ESLint
- Prettier
- Tailwind CSS IntelliSense

**.vscode/settings.json** (recomendado):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 6. Tailwind CSS v4

⚠️ **Importante:** Este template usa Tailwind CSS v4 (beta).

### Plugin ESLint Temporariamente Desabilitado

O `eslint-plugin-tailwindcss` está comentado em `eslint.config.js` devido à incompatibilidade com Tailwind v4.

**Reativar quando houver versão compatível:**

1. Descomentar import e configuração em `eslint.config.js`
2. Reinstalar plugin: `npm install -D eslint-plugin-tailwindcss`

## 7. GitHub Copilot

### Instruções Customizadas

O arquivo `.github/copilot-instructions.md` contém regras específicas:

- Tipagem TypeScript estrita
- Padrões de código
- Commits convencionais
- Priorização de componentes daisyUI

**Personalize conforme seu time.**

## 8. Primeira Release

### Opção A: Automática

Faça merge na `main` com commits `feat:` ou `fix:`, a release será criada automaticamente.

### Opção B: Manual

```bash
git tag v0.1.0
git push origin v0.1.0
```

## 9. Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

Ou conecte repositório em [vercel.com](https://vercel.com).

### Netlify

```bash
npm install -g netlify-cli
netlify init
```

### Build Manual

```bash
npm run build
# Arquivos em /dist
```

## 10. Checklist Final

Antes de começar a desenvolver:

- [ ] Dependências instaladas
- [ ] package.json atualizado
- [ ] README.md personalizado
- [ ] GitHub Actions permissões configuradas
- [ ] Playwright browsers instalados
- [ ] IDE configurado (ESLint, Prettier)
- [ ] Primeira release criada
- [ ] Deploy configurado (se necessário)

## Estrutura do Projeto

```
/
├── .github/
│   ├── copilot-instructions.md  # Regras do Copilot
│   └── workflows/               # CI/CD pipelines
├── docs/                        # Documentação
├── e2e/                         # Testes E2E (Playwright)
├── public/                      # Assets estáticos
├── src/
│   ├── components/              # Componentes React
│   ├── __tests__/               # Testes unitários
│   └── App.tsx                  # Componente principal
├── .releaserc.json              # Config Semantic Release
├── playwright.config.ts         # Config Playwright
├── vitest.config.ts            # Config Vitest
├── tailwind.config.js          # Config Tailwind
└── vite.config.ts              # Config Vite
```

## Suporte

- [Documentação Completa](./README.md)
- [Sistema de Release](./RELEASE.md)
- [Issues no GitHub](https://github.com/ApenasGabs/ApenasTemplate/issues)
