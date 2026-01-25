# SimpleList Worklog (2026-01-25)

## Contexto
Registro local de itens planejados, progresso e decisões. Foco inicial: analisar e resolver duplicidade de issues.

## Issues abertas (visão rápida)
- #1 Épico: SimpleList – Organizador Minimalista
- #2 Ordenação e Comportamento dos Itens na Lista de Tarefas
- #3 Ordenação e Comportamento dos Itens na Lista de Tarefas (duplicada de #2)
- #4 Gerenciamento de Listas e Navegação entre Listas
- #5 Criação, Edição e Remoção de Tarefas
- #6 Prioridade e Datas para Tarefas
- #7 Visão "Hoje" e Tarefas Pendentes
- #8 Conclusão de Tarefas e Histórico
- #9 Configurações Básicas (Tema, Idioma, Preferências)
- #10 Autenticação e Sincronização entre Dispositivos

## Análise de duplicidade (#2 vs #3)
- Descrição, critérios de aceite e contexto são idênticos.
- Decisão: manter #2 como fonte única; fechar #3 como duplicado referenciando #2.
- Próximo passo: comentar em #2 e #3 registrando a consolidação e fechar #3.

## Plano imediato
- [x] Confirmar decisão: fechar #3 como duplicado de #2.
- [ ] Comentar em #2 e #3 formalizando a consolidação e executar fechamento de #3.
- [x] Definir regra de ordenação padrão (criação vs alfabética) e se haverá opção de ordenação manual.
- [x] Especificar modelo de dados local para lista/tarefa (campos: id, título, descrição, status, prioridade, dueDate, listaId, timestamps).
- [x] Desenhar UX inicial de tarefas usando componentes existentes/daisyUI (mobile-first).
- [x] Mapear casos de teste unitários para ordenação, conclusão e reabertura (implementados para #2).
- [ ] Converter fluxos do Figma (HTML com Tailwind CDN) para a stack do projeto (React + TS + daisyUI + Tailwind local), reaproveitando componentes internos.

## Progresso
- Análise concluída: #3 duplicado de #2; decisão tomada de fechar #3.
- Implementado fluxo mobile-first da lista (Issue #2) com ordenação criação/alfabética, completed no final, toggle de prioridade e input de nova tarefa em React + TS + daisyUI.
- Testes unitários cobrem ordenação, movimentação de concluídos e retorno ao reabrir.
- Pendente: registrar comentários nos issues, fechar #3 e alinhar visual definitivo com Figma na stack atual.

## Próximas entregas esperadas
- Decisão registrada sobre duplicidade (#2/#3).
- Documento curto com regras de ordenação e estados de tarefa (pendente, concluída, priorizada, vencida).
- Checklist de testes mínimos para ordenação, conclusão e reabertura.
