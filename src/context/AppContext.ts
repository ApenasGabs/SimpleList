import { createContext } from "react";

export interface List {
  id: string;
  title: string;
  color?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Task {
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

export interface AppContextType {
  // State
  lists: List[];
  tasks: Task[];
  activeListId: string;

  // Actions - Lists
  createList: (title: string) => void;
  updateList: (id: string, updates: Partial<List>) => void;
  deleteList: (id: string) => void;
  setActiveList: (id: string) => void;

  // Actions - Tasks
  createTask: (title: string, listId: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Utility
  getTasksByList: (listId: string) => Task[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
