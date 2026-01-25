import { useMemo, useState } from "react";
import type { KeyboardEvent, ReactElement } from "react";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";

interface Task {
  id: string;
  title: string;
  createdAt: number;
  completed: boolean;
  completedAt?: number;
  list?: string;
  isStarred?: boolean;
}

type SortMode = "created" | "alpha";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Pagar conta de luz",
    createdAt: 1,
    completed: false,
    list: "Inbox",
    isStarred: false,
  },
  {
    id: "task-2",
    title: "Comprar pão integral",
    createdAt: 2,
    completed: false,
    list: "Inbox",
    isStarred: true,
  },
  {
    id: "task-3",
    title: "Ligar para o médico às 15h",
    createdAt: 3,
    completed: false,
    list: "Inbox",
    isStarred: false,
  },
  {
    id: "task-4",
    title: "Revisão do projeto",
    createdAt: 4,
    completed: true,
    completedAt: Date.now() - 1000,
    list: "Work",
    isStarred: false,
  },
];

const sortTasks = (tasks: Task[], mode: SortMode): Task[] => {
  const copy = [...tasks];
  if (mode === "alpha") {
    return copy.sort((a, b) => a.title.localeCompare(b.title, "pt"));
  }
  return copy.sort((a, b) => a.createdAt - b.createdAt);
};

const sortCompletedByFinishTime = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => (a.completedAt ?? 0) - (b.completedAt ?? 0));
};

const buildId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getBadgeTone = (task: Task): string => {
  if (task.completed) return "badge-ghost";
  if (task.isStarred) return "badge-warning";
  return "badge-outline";
};

export const TaskList = (): ReactElement => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sortMode, setSortMode] = useState<SortMode>("created");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const orderedTasks = useMemo(() => {
    const active = sortTasks(
      tasks.filter((task) => !task.completed),
      sortMode,
    );
    const completed = sortCompletedByFinishTime(tasks.filter((task) => task.completed));
    return showCompleted ? [...active, ...completed] : active;
  }, [tasks, sortMode, showCompleted]);

  const handleToggleComplete = (taskId: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: task.completed ? undefined : Date.now(),
            }
          : task,
      ),
    );
  };

  const handleAddTask = (): void => {
    const title = newTaskTitle.trim();
    if (!title) return;

    const alreadyExists = tasks.some((task) => task.title.toLowerCase() === title.toLowerCase());
    if (alreadyExists) {
      setNewTaskTitle("");
      return;
    }

    const newTask: Task = {
      id: buildId(),
      title,
      createdAt: Date.now(),
      completed: false,
      list: "Inbox",
      isStarred: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    }
  };

  const handleToggleStar = (taskId: string): void => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, isStarred: !task.isStarred } : task)),
    );
  };

  return (
    <section className="w-full max-w-md mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="badge badge-primary">Inbox</div>
              <span className="text-sm text-base-content/70">Mobile first</span>
            </div>
            <div className="text-sm text-base-content/60" data-testid="task-count">
              {tasks.filter((task) => !task.completed).length} abertas
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Adicionar tarefa"
              aria-label="Adicionar tarefa"
              className="input input-bordered w-full"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              onKeyDown={handleKeyDown}
              data-testid="input-new-task"
            />
            <Button
              variant="primary"
              onClick={handleAddTask}
              className="whitespace-nowrap"
              data-testid="btn-add-task"
            >
              Adicionar
            </Button>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="tabs tabs-boxed bg-base-200" data-testid="sort-tabs">
              <button
                type="button"
                className={`tab ${sortMode === "created" ? "tab-active" : ""}`}
                onClick={() => setSortMode("created")}
                data-testid="sort-created"
              >
                Criação
              </button>
              <button
                type="button"
                className={`tab ${sortMode === "alpha" ? "tab-active" : ""}`}
                onClick={() => setSortMode("alpha")}
                data-testid="sort-alpha"
              >
                Alfabética
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                aria-label="Exibir concluídas"
                checked={showCompleted}
                onChange={(event) => setShowCompleted(event.target.checked)}
                label="Concluídas"
                size="sm"
              />
            </div>
          </div>

          <div className="divider my-0">Tarefas</div>

          <div className="flex flex-col gap-2" data-testid="task-list">
            {orderedTasks.map((task) => {
              const textMuted = task.completed ? "line-through text-base-content/50" : "";

              return (
                <div
                  key={task.id}
                  className="flex items-center gap-3 bg-base-100 border border-base-200 rounded-xl px-3 py-3 shadow-sm"
                  data-testid={`task-row-${task.id}`}
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    aria-label={`Marcar ${task.title}`}
                    data-testid={`task-toggle-${task.id}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${textMuted}`}
                      data-testid={`task-title-${task.id}`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-base-content/60">
                      <span className={`badge badge-sm ${getBadgeTone(task)}`}>
                        {task.list ?? "Inbox"}
                      </span>
                      {task.completed ? (
                        <span className="badge badge-ghost badge-sm">Concluída</span>
                      ) : null}
                      {task.isStarred ? (
                        <span className="badge badge-warning badge-sm">Prioritária</span>
                      ) : null}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-ghost btn-xs ${task.isStarred ? "text-warning" : "text-base-content/60"}`}
                    aria-label={task.isStarred ? "Remover prioridade" : "Marcar como prioritária"}
                    onClick={() => handleToggleStar(task.id)}
                    data-testid={`task-star-${task.id}`}
                    aria-pressed={task.isStarred}
                  >
                    Fav
                  </button>
                </div>
              );
            })}

            {orderedTasks.length === 0 && (
              <div className="alert alert-info" data-testid="empty-state">
                <span>Nenhuma tarefa cadastrada.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
