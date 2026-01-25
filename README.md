# SimpleList - Gerenciador de Tarefas e Listas

Uma aplicação moderna e responsiva para gerenciamento de tarefas e listas, desenvolvida com React 19, TypeScript e Vite. Organize suas tarefas com prioridades, datas de vencimento e temas personalizáveis.

> **Desenvolvido com ❤️ e produtividade em mente**

## 🎯 Funcionalidades Principais

- Criar e gerenciar múltiplas listas de tarefas
- Adicionar tarefas com título, descrição e data de vencimento
- Definir prioridades para tarefas (Baixa, Média, Alta)
- Marcar tarefas como concluídas
- Visualizar tarefas do dia (Today View)
- Ordenar tarefas por data de criação ou alfabeticamente
- 33 temas disponíveis (Light, Dark, Cupcake, Halloween, Synthwave, e mais)
- Persistência de dados com localStorage
- Interface responsiva para mobile, tablet e desktop
- Testes automatizados (87+ unitários, 29 E2E)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca JavaScript para UI reativa
- **TypeScript 5.9.3** - Tipagem estática e segurança de tipos
- **Vite 7.2.4** - Build tool ultra-rápido com HMR
- **Tailwind CSS 4.1.18** - Framework CSS utility-first
- **daisyUI 5.5.14** - Componentes elegantes para Tailwind

### Testes & Qualidade
- **Vitest 4.0.18** - Testes unitários (87 testes)
- **Playwright 1.58.0** - Testes E2E em múltiplos navegadores (29 testes)
- **ESLint 9.39.1** - Linting e análise de código

### CI/CD
- **GitHub Actions** - Automação de testes e build em PRs

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

O navegador abrirá automaticamente em `http://localhost:5173` com HMR habilitado.

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Cria build otimizado para produção
npm run preview          # Visualiza o build localmente

# Testes
npm run test             # Executa 87 testes unitários com Vitest
npm run test:ui          # Interface visual dos testes
npm run test:coverage    # Relatório de cobertura de testes

# Testes E2E
npm run e2e              # Executa 29 testes Playwright
npm run e2e:ui           # Interface visual dos testes E2E
npm run e2e:debug        # Modo debug dos testes
npm run e2e:report       # Visualiza o relatório HTML

# Linting
npm run lint             # Verifica qualidade do código
npm run lint:fix         # Corrige problemas automaticamente
```

## 📂 Estrutura do Projeto

```
SimpleList/
├── e2e/                                    # Testes end-to-end (29 testes)
│   ├── general/
│   │   └── app.spec.ts                    # Testes de carregamento e navegação
│   └── components/
│       ├── tasks.spec.ts                  # Testes de tarefas (criar, editar, deletar)
│       └── theme-selector.spec.ts         # Testes de temas (25 testes)
│
├── src/
│   ├── __tests__/                         # Testes unitários
│   ├── components/
│   │   ├── App.tsx                        # Componente principal
│   │   ├── TaskList/
│   │   │   ├── TaskList.tsx              # Lista de tarefas
│   │   │   └── __tests__/
│   │   ├── ListManager/                   # Gerenciador de listas
│   │   ├── TodayView/                     # Visualização do dia
│   │   ├── DatePicker/                    # Seletor de datas
│   │   ├── ThemeSelector/                 # Seletor de temas
│   │   └── ...outros componentes
│   ├── assets/                            # Imagens e fontes
│   ├── App.tsx                            # App principal
│   ├── main.tsx                           # Ponto de entrada
│   └── index.css                          # Estilos globais
│
├── public/                                # Arquivos estáticos
├── .github/
│   └── workflows/
│       └── pr-tests.yml                   # Pipeline de CI/CD
├── playwright.config.ts                   # Configuração Playwright
├── tailwind.config.js                     # Configuração Tailwind CSS
├── tsconfig.json                          # Configuração TypeScript
├── vite.config.ts                         # Configuração Vite
└── eslint.config.js                       # Configuração ESLint
```

## 🎨 Recursos Principais

### Tailwind CSS + daisyUI

Componentes elegantes e prontos para uso com 33 temas personalizáveis.

### TypeScript

Tipagem completa em todo o projeto para maior segurança e melhor experiência de desenvolvimento.

### Hot Module Replacement (HMR)

Alterações no código são refletidas instantaneamente sem perder o estado da aplicação.

### Testes Completos

- **Vitest**: 87 testes unitários rápidos e confiáveis
- **Playwright**: 29 testes E2E em navegadores reais (Chrome, Firefox, Safari)

## 🚀 Como Usar Este Template

### 1. Clonar ou fazer fork

```bash
git clone https://github.com/ApenasGabs/SimpleList.git
cd SimpleList
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar desenvolvimento

```bash
npm run dev
```

### 4. Rodar testes

```bash
npm run test      # Testes unitários
npm run e2e       # Testes E2E
npm run lint      # Verificar qualidade
```

### 5. Build para produção

```bash
npm run build
npm run preview   # Testar o build localmente
```

## 🔧 Personalizações Recomendadas

### Estender Tailwind Theme

Adicione em `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
}
```

### Adicionar variáveis de ambiente

Crie `.env` e `.env.local`:

```
VITE_API_URL=https://api.example.com
```

Acesse em seus componentes:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📚 Documentação e Recursos

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [daisyUI](https://daisyui.com)
- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev)
- [ESLint](https://eslint.org)

## 🧪 Testes

### Testes Unitários (87 testes)

```bash
npm run test              # Executa todos os testes com Vitest
npm run test:ui           # Interface visual com cobertura
npm run test:coverage     # Relatório detalhado de cobertura
```

Cobertura:
- Componentes básicos (Button, Input, Card, etc.)
- TaskList (criar, editar, deletar, ordenar tarefas)
- ListManager (criar, alternar, deletar listas)
- DatePicker (seleção de datas)
- ThemeSelector (seleção de temas)
- TodayView (visualização do dia)

### Testes E2E (29 testes)

```bash
npm run e2e               # Executa todos os testes Playwright
npm run e2e:debug         # Modo debug interativo
npm run e2e:report        # Visualiza relatório HTML
```

Cobertura:
- **App (4 testes)**: Carregamento, inbox, estado vazio, alternância de abas
- **Tarefas (4 testes)**: Criar, completar, ordenar, deletar
- **Temas (25 testes)**: Renderização, temas específicos, persistência, acessibilidade, responsividade

## 🎨 Temas Disponíveis

SimpleList oferece 33 temas diferentes através do daisyUI:

Light, Dark, Cupcake, Bumblebee, Emerald, Corporate, Synthwave, Retro, Cyberpunk, Valentine, Halloween, Garden, Forest, Aqua, Lofi, Pastel, Fantasy, Wireframe, Black, Luxury, Dracula, CMYK, Autumn, Business, Acid, Lemonade, Night, Coffee, Winter, Dim, Nord, Sunset e mais.

Selecione seu tema favorito através do ícone de paleta de cores na navbar.

## 🚀 Roadmap

### v2.0.0 - Sincronização na Nuvem
- Sincronizar tarefas com servidor
- Autenticação com Google/GitHub
- Backup automático na nuvem

### v2.1.0 - Colaboração
- Compartilhar listas com outros usuários
- Comentários em tarefas
- Histórico de alterações

### v3.0.0 - Produtividade Avançada
- Recorrências de tarefas
- Integração com calendário
- Automações e atalhos

## 🌐 SEO & Descoberta

SimpleList é otimizado para descoberta:
- Otimizado para busca por "listas", "tarefas", "gerenciador"
- Perfil do desenvolvedor: `@apenasgabs`, `apenas gabs`
- Descrição completa em meta tags

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: descrição'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

### Padrões de Código

- Sempre usar TypeScript com tipagem explícita
- Nunca usar `any`
- Arrow functions (`const fn = () => {}`)
- Testes para todas as funcionalidades
- Componentes com `data-testid` para testes E2E

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido por [@apenasgabs](https://github.com/apenasgabs)**

Visite o projeto: https://github.com/ApenasGabs/SimpleList
