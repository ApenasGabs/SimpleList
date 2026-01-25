# SimpleList - Organizador Minimalista de Tarefas

Um aplicativo web de gerenciamento de tarefas minimalista e eficiente, focado em simplicidade e produtividade. Organize suas tarefas em listas, defina prioridades, acompanhe datas de vencimento e mantenha o foco no que importa.

> **Feito com ❤️ para quem valoriza simplicidade e eficiência**

[![GitHub release](https://img.shields.io/github/v/release/ApenasGabs/SimpleList?style=flat-square)](https://github.com/ApenasGabs/SimpleList/releases)
[![License](https://img.shields.io/github/license/ApenasGabs/SimpleList?style=flat-square)](./LICENSE)

## 📚 Documentação

- [🏗️ Arquitetura](./docs/ARCHITECTURE.md) - Estrutura e decisões técnicas
- [📝 Sistema de Release](./docs/RELEASE.md) - Versionamento automático
- [💻 Estrutura do Projeto](#-estrutura-do-projeto) - Organização dos arquivos
- [📋 Changelog](./CHANGELOG.md) - Histórico de mudanças

## 🎯 Funcionalidades

### Implementado

- **Gerenciamento de Listas** - Crie, edite e delete listas de tarefas
- **CRUD de Tarefas** - Adicione, edite, marque como completo e delete tarefas
- **Ordenação Inteligente** - Ordene por data de criação ou alfabeticamente
- **Inversão de Ordenação** - Clique duas vezes para inverter a ordem (asc/desc)
- **Sistema de Prioridades** - Defina tarefas como baixa, média ou alta prioridade
- **Datas de Vencimento** - Atribua datas às tarefas com calendário intuitivo
- **Vista "Hoje"** - Visualize tarefas de hoje e atrasadas em uma aba dedicada
- **Badges Visuais** - Indicadores coloridos de status e prioridade
- **Sistema de Modais** - Confirmações elegantes para ações críticas
- **Persistência Local** - Dados salvos automaticamente no localStorage
- **Temas Múltiplos** - 30+ temas do daisyUI disponíveis
- **Design Responsivo** - Interface adaptável para mobile e desktop

### 🚧 Planejado

- ⬜ **Autenticação** - Login com Google e sincronização entre dispositivos
- ⬜ **Histórico e Undo** - Desfaça ações e veja histórico de conclusões
- ⬜ **Configurações** - Preferências de idioma e personalização avançada
- ⬜ **Compartilhamento** - Compartilhe listas com outras pessoas
- ⬜ **Notificações** - Lembretes de tarefas próximas ao vencimento

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19.2.0** - Biblioteca JavaScript para UI reativa
- **TypeScript 5.9.3** - Tipagem estática completa (zero `any`)
- **Vite 7.2.4** - Build tool ultra-rápido com HMR
- **Tailwind CSS 4.1.18** - Framework CSS utility-first
- **daisyUI 5.5.14** - Componentes elegantes e acessíveis
- **react-day-picker 9.13.0** - Seletor de datas intuitivo

### Ferramentas de Qualidade

- **Vitest 4.0.18** - Framework de testes unitários (87+ testes)
- **Playwright 1.58.0** - Testes end-to-end
- **Testing Library** - Testes focados em comportamento do usuário
- **ESLint 9.39.1** - Linting com regras rigorosas
- **Semantic Release** - Versionamento e releases automáticas

## 📦 Como Começar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ApenasGabs/SimpleList.git

# Entre na pasta do projeto
cd SimpleList

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento (porta 5173)
npm run dev
```

O navegador abrirá automaticamente em `http://localhost:5173` com hot reload habilitado.

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Cria build otimizado para produção
npm run preview          # Visualiza o build localmente

# Testes
npm run test             # Executa testes unitários com Vitest
npm run test:ui          # Interface visual dos testes
npm run test:coverage    # Relatório de cobertura de testes

# Testes E2E
npm run e2e              # Executa testes Playwright
npm run e2e:ui           # Interface visual dos testes E2E
npm run e2e:debug        # Modo debug dos testes
npm run e2e:report       # Visualiza o relatório HTML

# Linting
npm run lint             # Verifica qualidade do código
npm run lint:fix         # Corrige problemas automaticamente
```

## 💻 Estrutura do Projeto

```
SimpleList/
├── src/
│   ├── components/          # Componentes React
│   │   ├── TaskList/       # Lista de tarefas com ordenação
│   │   ├── TodayView/      # Vista de tarefas de hoje
│   │   ├── ListManager/    # Gerenciamento de listas
│   │   ├── DatePicker/     # Seletor de datas
│   │   ├── DueDateBadge/   # Badge de data de vencimento
│   │   ├── Modal/          # Sistema de modais
│   │   ├── ThemeSelector/  # Seletor de temas
│   │   └── ...             # Componentes base (Button, Input, etc)
│   │
│   ├── context/            # Context API (estado global)
│   │   ├── AppContext.ts   # Definição de tipos
│   │   ├── AppProvider.tsx # Provider com lógica
│   │   └── useApp.ts       # Hook customizado
│   │
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Entry point
│
├── e2e/                     # Testes end-to-end
│   ├── components/         # Testes de componentes
│   ├── general/            # Testes gerais
│   └── accessibility/      # Testes de acessibilidade
│
├── docs/                    # Documentação
│   ├── ARCHITECTURE.md     # Arquitetura e decisões técnicas
│   ├── SETUP.md            # Guia de configuração
│   └── RELEASE.md          # Sistema de releases
│
└── dist/                    # Build de produção (gerado)
```

## 🧪 Testes e Qualidade

### Cobertura de Testes

- **87+ testes unitários** rodando com Vitest
- **Testes E2E** com Playwright para fluxos críticos
- **Testing Library** para testes focados em comportamento
- **localStorage** mockado para isolamento de testes

### Padrões de Código

- **Zero erros de lint** - ESLint configurado com regras rigorosas
- **TypeScript estrito** - Sem uso de `any` em lugar algum
- **Arrow functions** - Padrão consistente em todo o código
- **Componentes daisyUI** - Reutilização máxima de componentes

### Executar Testes

```bash
# Testes unitários
npm run test                 # Modo watch
npm run test:coverage        # Com cobertura

# Testes E2E
npm run e2e                  # Headless
npm run e2e:ui               # Interface visual
```

## 🎨 Estado da Aplicação

### Gerenciamento de Estado

- **Context API** - Estado global simples e eficiente
- **localStorage** - Persistência automática dos dados
- **React Hooks** - useState, useCallback, useEffect

### Estrutura de Dados

```typescript
interface List {
  id: string;
  title: string;
  color?: string;
  createdAt: number;
  updatedAt: number;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: number;
  priority?: "low" | "medium" | "high";
  dueDate?: number;
  listId: string;
  createdAt: number;
  updatedAt: number;
}
```

## 🚀 Roadmap

### Versão Atual (v1.3.0)

- Gerenciamento completo de listas e tarefas
- Sistema de prioridades e datas
- Vista "Hoje" com filtros
- Ordenação com inversão de direção
- Modais customizados
- Persistência local

### Próximas Versões

**v2.0.0 - Sincronização**
- Firebase Authentication
- Firestore sync
- Offline-first com queue de sincronização
- Resolução de conflitos

**v2.1.0 - Colaboração**
- Compartilhamento de listas
- Permissões de usuário
- Comentários em tarefas

**v3.0.0 - Produtividade**
- Histórico e undo/redo
- Estatísticas e insights
- Notificações e lembretes
- Subtarefas e checklist

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças seguindo [Conventional Commits](https://www.conventionalcommits.org/)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrão de Commits

```bash
feat: ✨ nova funcionalidade
fix: 🐛 correção de bug
docs: 📚 documentação
style: 👌 formatação
refactor: ♻️ refatoração
test: 🧪 testes
chore: 🔧 manutenção
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [React](https://react.dev/) - Biblioteca UI
- [Vite](https://vitejs.dev/) - Build tool incrível
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [daisyUI](https://daisyui.com/) - Componentes elegantes
- [react-day-picker](https://daypicker.dev/) - Seletor de datas

---

**Desenvolvido com ❤️ por [ApenasGabs](https://github.com/ApenasGabs)**
