import type { ReactElement, ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { AppContext, type AppContextType, type List, type Task } from "./AppContext";

const STORAGE_KEY = "simplelist_data_v1";

const defaultList: List = {
  id: "default-inbox",
  title: "Inbox",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const buildId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const loadFromStorage = (): { lists: List[]; tasks: Task[] } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load from storage:", error);
  }

  return {
    lists: [defaultList],
    tasks: [],
  };
};

const saveToStorage = (lists: List[], tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lists, tasks }));
  } catch (error) {
    console.error("Failed to save to storage:", error);
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps): ReactElement => {
  const [lists, setLists] = useState<List[]>(() => {
    const { lists: loadedLists } = loadFromStorage();
    return loadedLists;
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const { tasks: loadedTasks } = loadFromStorage();
    return loadedTasks;
  });
  const [activeListId, setActiveListId] = useState<string>(() => {
    const { lists: loadedLists } = loadFromStorage();
    return loadedLists.length > 0 ? loadedLists[0].id : defaultList.id;
  });

  // Salvar no localStorage sempre que dados mudam
  useEffect(() => {
    saveToStorage(lists, tasks);
  }, [lists, tasks]);

  const createList = useCallback((title: string): void => {
    if (!title.trim()) return;

    const newList: List = {
      id: buildId(),
      title: title.trim(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setLists((prev) => [...prev, newList]);
    setActiveListId(newList.id);
  }, []);

  const updateList = useCallback((id: string, updates: Partial<List>): void => {
    setLists((prev) =>
      prev.map((list) => (list.id === id ? { ...list, ...updates, updatedAt: Date.now() } : list)),
    );
  }, []);

  const deleteList = useCallback(
    (id: string): void => {
      // Não permitir deletar lista padrão
      if (id === defaultList.id) return;

      setLists((prev) => prev.filter((list) => list.id !== id));
      setTasks((prev) => prev.filter((task) => task.listId !== id));

      // Se deletou a lista ativa, muda para a primeira disponível
      if (activeListId === id && lists.length > 0) {
        const remaining = lists.filter((l) => l.id !== id);
        setActiveListId(remaining[0]?.id ?? defaultList.id);
      }
    },
    [activeListId, lists],
  );

  const createTask = useCallback((title: string, listId: string): void => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: buildId(),
      title: title.trim(),
      completed: false,
      listId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              updatedAt: Date.now(),
              // Se marcar como concluída, registrar timestamp
              completedAt: updates.completed && !task.completed ? Date.now() : task.completedAt,
            }
          : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const getTasksByList = useCallback(
    (listId: string): Task[] => {
      return tasks.filter((task) => task.listId === listId);
    },
    [tasks],
  );

  const value: AppContextType = {
    lists,
    tasks,
    activeListId,
    createList,
    updateList,
    deleteList,
    setActiveList: setActiveListId,
    createTask,
    updateTask,
    deleteTask,
    getTasksByList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
