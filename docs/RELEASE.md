# Sistema de Release Automática

Este template usa **Semantic Release** para automatizar versões, changelog e releases.

## Como Funciona

### 1. Commits Convencionais

O sistema analisa os commits seguindo o padrão:

```
<tipo>: <descrição>
```

**Impacto no versionamento:**

- `feat:` → Incrementa **MINOR** (1.0.0 → 1.1.0)
- `fix:` → Incrementa **PATCH** (1.0.0 → 1.0.1)
- `BREAKING CHANGE:` → Incrementa **MAJOR** (1.0.0 → 2.0.0)
- `docs:`, `chore:`, `style:`, etc. → Não gera release

### 2. Fluxo Automático

Quando você faz **merge/push na branch `main`**:

1. ✅ Pipeline analisa commits desde última release
2. ✅ Calcula nova versão automaticamente
3. ✅ Gera/atualiza `CHANGELOG.md`
4. ✅ Cria tag Git (ex: `v1.2.3`)
5. ✅ Publica release no GitHub com notas

### 3. Exemplo de CHANGELOG Gerado

```markdown
# Changelog

## [1.2.0] - 2026-01-24

### ✨ Features
- adiciona sistema de autenticação
- adiciona dark mode

### 🐛 Bug Fixes
- arruma validação de email
- corrige erro no form

### 📚 Documentation
- atualiza README
```

## Configuração Necessária

### 1. GitHub Token

O workflow precisa de permissões para criar releases:

**Opção A: Usar token automático (Recomendado)**

- No repositório: **Settings** → **Actions** → **General**
- Em "Workflow permissions", selecione **Read and write permissions**
- Marque **Allow GitHub Actions to create and approve pull requests**

**Opção B: Usar Personal Access Token**

- Crie PAT em: <https://github.com/settings/tokens>
- Permissões: `repo`, `write:packages`
- Adicione secret: **Settings** → **Secrets** → `GH_TOKEN`

### 2. Primeira Release

Para iniciar o versionamento:

```bash
# Criar primeira tag manualmente
git tag v0.1.0
git push origin v0.1.0
```

Ou deixe o semantic-release criar automaticamente começando de `v1.0.0`.

## Personalizações

### Alterar Versão Inicial

Edite `.releaserc.json`:

```json
{
  "branches": ["main"],
  "tagFormat": "v${version}",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md"
    }],
    "@semantic-release/npm",
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md", "package.json"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    "@semantic-release/github"
  ]
}
```

### Desabilitar Releases Automáticas

Se quiser apenas tags sem publicar releases:

1. Vá em `.github/workflows/release.yml`
2. Comente ou remova o plugin `@semantic-release/github`

### Rodar Localmente

```bash
# Testar próxima versão (dry-run)
npx semantic-release --dry-run

# Gerar release localmente (não recomendado)
npx semantic-release
```

## Troubleshooting

### Pipeline não executa

- Verifique se o arquivo `.github/workflows/release.yml` existe
- Confirme permissões em Settings → Actions

### "No release published"

- Verifique se há commits do tipo `feat:` ou `fix:` desde última release
- Commits de docs/chore não geram release

### Erro de permissão

- Verifique configuração de token (seção Configuração Necessária)

### Release duplicada

- Pipeline tem `[skip ci]` no commit de release para evitar loop

## Boas Práticas

✅ **Sempre use commits convencionais**
✅ **Documente breaking changes no corpo do commit**
✅ **Revise CHANGELOG.md periodicamente**
✅ **Não force push na main após release**

## Referências

- [Semantic Release](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Padrões de Commits (PT-BR)](https://github.com/iuricode/padroes-de-commits)
