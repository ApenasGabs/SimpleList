# Arquitetura SimpleList - Proposta de Design

## 1. Stack Geral

```
Frontend (Vercel)
├── React 19 + TypeScript
├── daisyUI + Tailwind CSS
├── Context API / State Management
└── React Query (optional) para cache/sync

Backend (Vercel Functions - Node.js)
├── Proxy para Firebase
├── Validação de dados
└── Business logic crítica

Database / Auth
├── Google Firebase Auth (Social + Email/Password)
├── Firestore ou Realtime DB (dados)
└── Firebase Storage (se precisar arquivos)

Client Storage
├── localStorage (cache local)
├── Sincronização com Firestore
└── Resolução de conflitos offline-first
```

---

## 2. Fluxo de Dados (Sincronização)

### Cenário Online
```
User Action (React)
    ↓
State Update (Context/Zustand)
    ↓
Persist lokalmente (localStorage)
    ↓
POST /api/tasks → Vercel Function
    ↓
Function valida + chama Firebase Firestore
    ↓
Resposta retorna → State atualiza
```

### Cenário Offline
```
User Action (React)
    ↓
State Update (localStorage)
    ↓
Add to queue (sync pending)
    ↓
[Quando volta online]
    ↓
Process queue → POST /api/tasks
    ↓
Sync com Firestore
    ↓
Update state com confirmação
```

---

## 3. Estrutura de Dados (Firestore)

### Collections:
```
users/
  {uid}/
    profile
    preferences
    settings

lists/
  {uid}/
    {listId}/
      title
      color
      createdAt
      updatedAt

tasks/
  {uid}/
    {listId}/
      {taskId}/
        title
        description
        completed
        priority
        dueDate
        createdAt
        updatedAt
        completedAt
        listId
```

---

## 4. Vercel Functions (Backend Proxy)

### Endpoints sugeridos:
```
POST /api/auth/login         → Firebase Auth
POST /api/auth/logout        → Firebase Auth

GET  /api/lists              → fetch all lists
POST /api/lists              → create list
PATCH /api/lists/:listId     → update list
DELETE /api/lists/:listId    → delete list

GET  /api/tasks              → fetch tasks (filter by list)
POST /api/tasks              → create task
PATCH /api/tasks/:taskId     → update task
DELETE /api/tasks/:taskId    → delete task

GET  /api/sync               → sync point (para recuperar estado)
```

### Responsabilidades:
- Validação de dados (schema)
- Autenticação (JWT from Firebase)
- Rate limiting / throttling
- Logging
- Cache headers

---

## 5. Estado Global (Frontend)

### Context / Store (Zustand):
```typescript
interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Data
  lists: List[];
  tasks: Task[];
  
  // UI
  activeListId: string;
  loading: boolean;
  error: string | null;
  
  // Sync
  syncQueue: PendingAction[];
  lastSyncTime: number;
  isOnline: boolean;
  
  // Actions
  setUser()
  addList()
  updateTask()
  syncData()
  addToQueue()
  processSyncQueue()
}
```

---

## 6. Resolução de Conflitos (Offline-First)

### Estratégia:
```
Last-Write-Wins (LWW) com timestamps
├── Client envia: { updatedAt: timestamp, ... }
├── Server compara com DB updatedAt
├── Se client.updatedAt > server.updatedAt → aceita
├── Se client.updatedAt < server.updatedAt → retorna versão servidor
└── UI resolve conflito (mostrar ambas versões ou aceitar servidor)
```

---

## 7. Segurança

### Firebase Rules (Firestore):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      
      match /lists/{listId} {
        allow read, write: if request.auth.uid == uid;
        
        match /tasks/{taskId} {
          allow read, write: if request.auth.uid == uid;
        }
      }
    }
  }
}
```

### Vercel Functions:
```typescript
// Middleware de autenticação
const authMiddleware = async (req) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  req.uid = decodedToken.uid;
};
```

---

## 8. Fluxo de Autenticação

```
1. User clica "Login com Google"
2. Firebase SDK abre popup Google
3. Token retorna ao cliente (localStorage)
4. Context atualiza state com user
5. Próximas requisições: 
   header Authorization: "Bearer {idToken}"
6. Vercel Function valida token com Firebase Admin SDK
7. Se válido → processa requisição
8. Se inválido → retorna 401 → Client atualiza auth state
```

---

## 9. Persistência Local (localStorage)

### Estrutura:
```json
{
  "simplelist_cache": {
    "user": {...},
    "lists": [...],
    "tasks": [...],
    "lastSync": 1234567890,
    "syncQueue": [
      {
        "action": "CREATE",
        "type": "task",
        "data": {...},
        "timestamp": 1234567890
      }
    ]
  }
}
```

### Tamanho:
- localStorage limit: ~5-10MB por origin
- Com compressão: suporta milhares de tarefas

---

## 10. Roadmap de Implementação

### MVP (Phase 1):
- [x] Issue #2: Ordenação de tarefas (DONE)
- [ ] Issue #4: Gerenciamento de listas (sem sync)
- [ ] Issue #5: CRUD de tarefas (sem sync)
- [ ] Auth básica com Firebase (Context API)
- [ ] localStorage para persistência
- [ ] Vercel Function simples (proxy GET/POST)

### Phase 2:
- [ ] Sync full Firestore (online/offline)
- [ ] Resolução de conflitos
- [ ] Queue de sync
- [ ] Issue #6: Prioridade e datas
- [ ] Issue #7: Visão "Hoje"

### Phase 3:
- [ ] Issue #8: Histórico e undo
- [ ] Issue #9: Configurações e tema
- [ ] Melhorias de performance (caching, indexação)

### Phase 4:
- [ ] Issue #10: Sincronização multi-dispositivos
- [ ] Notificações (se viável)

---

## 11. Perguntas para Decisão

1. **Estado global**: Context API simples ou Zustand/Redux?
2. **Banco de dados**: Firestore (recomendado) ou Realtime DB?
3. **Cache**: React Query / SWR ou manual com Context?
4. **Sync**: Começar com localStorage + manual sync ou usar Firebase Realtime?
5. **Tipo de tarefas compartilhadas**: Apenas por link ou equipes?
6. **Backups**: Auto-backup via Firebase ou manual?

---

## 12. Exemplo de Hook (useSync)

```typescript
// Hook customizado para sync
const useSync = () => {
  const { tasks, lists } = useAppStore();
  const [isSyncing, setIsSyncing] = useState(false);
  
  const sync = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/sync', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const data = await response.json();
      
      // Merge com state local
      updateAppState(data);
      localStorage.setItem('lastSync', Date.now());
    } catch (error) {
      console.error('Sync failed:', error);
      // Mantém fila local para tentar depois
    } finally {
      setIsSyncing(false);
    }
  };
  
  // Sync ao mudar online/offline
  useEffect(() => {
    window.addEventListener('online', sync);
    return () => window.removeEventListener('online', sync);
  }, []);
  
  return { sync, isSyncing };
};
```

---

## Próximos Passos

1. ✅ Revisar e discutir essa arquitetura
2. ⬜ Decidir sobre estado global (Context vs Zustand)
3. ⬜ Implementar estrutura básica de Context + Firebase Auth
4. ⬜ Criar primeira Vercel Function (GET /api/tasks)
5. ⬜ Integrar localStorage + sync simples
6. ⬜ Continuar com Issue #4 (listas) e #5 (CRUD)
