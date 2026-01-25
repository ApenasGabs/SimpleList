import { useMemo, useState } from "react";
import type { KeyboardEvent, ReactElement } from "react";
import { useApp, type Task } from "../../context";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";

type SortMode = "created" | "alpha";

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

const getBadgeTone = (task: Task): string => {
  if (task.completed) return "badge-ghost";
  if (task.priority === "high") return "badge-error";
  if (task.priority === "medium") return "badge-warning";
  return "badge-outline";
};

interface TaskListProps {
  listId: string;
}

/**
 * Componente para listar tarefas de uma lista específica
 * Integrado com Context global
 * Issue #2 - Ordenação
 * Issue #5 - CRUD
 */
export const TaskList = ({ listId }: TaskListProps): ReactElement => {
  const { getTasksByList, createTask, updateTask, deleteTask } = useApp();
  const [sortMode, setSortMode] = useState<SortMode>("created");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const tasks = getTasksByList(listId);

  const orderedTasks = useMemo(() => {
    const active = sortTasks(
      tasks.filter((task) => !task.completed),
      sortMode,
    );
    const completed = sortCompletedByFinishTime(tasks.filter((task) => task.completed));
    return showCompleted ? [...active, ...completed] : active;
  }, [tasks, sortMode, showCompleted]);

  const handleToggleComplete = (taskId: string): void => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask(taskId, { completed: !task.completed });
    }
  };

  const handleAddTask = (): void => {
    const title = newTaskTitle.trim();
    if (!title) return;

    const alreadyExists = tasks.some((task) => task.title.toLowerCase() === title.toLowerCase());
    if (alreadyExists) {
      alert("Uma tarefa com este título já existe nesta lista");
      setNewTaskTitle("");
      return;
    }

    createTask(title, listId);
    setNewTaskTitle("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    }
  };

  const handleTogglePriority = (taskId: string): void => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const priorities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
    const currentIndex = priorities.indexOf(task.priority ?? "low");
    const nextIndex = (currentIndex + 1) % priorities.length;

    updateTask(taskId, { priority: priorities[nextIndex] });
  };

  const handleDeleteTask = (taskId: string): void => {
    if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
      deleteTask(taskId);
    }
  };

  const getPriorityLabel = (priority?: string): string => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Média";
      case "low":
        return "Baixa";
      default:
        return "Sem prioridade";
    }
  };

  return (
    <section className="w-full">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body gap-4">
          <div className="flex items-center justify-between">
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
                  className="flex items-center gap-3 bg-base-100 border border-base-200 rounded-xl px-3 py-3 shadow-sm hover:shadow-md transition-shadow"
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
                    {task.description && (
                      <p className="text-xs text-base-content/60 truncate mt-0.5">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1 text-xs text-base-content/60 flex-wrap">
                      {task.priority && (
                        <span className={`badge badge-sm ${getBadgeTone(task)}`}>
                          {getPriorityLabel(task.priority)}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="badge badge-outline badge-sm">
                          {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                      {task.completed && (
                        <span className="badge badge-ghost badge-sm">Concluída</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    aria-label="Mudar prioridade"
                    onClick={() => handleTogglePriority(task.id)}
                    data-testid={`task-priority-${task.id}`}
                    title={getPriorityLabel(task.priority)}
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs text-error"
                    aria-label={`Deletar ${task.title}`}
                    onClick={() => handleDeleteTask(task.id)}
                    data-testid={`task-delete-${task.id}`}
                  >
                    ✕
                  </button>
                </div>
              );
            })}

            {orderedTasks.length === 0 && (
              <div className="alert alert-info" data-testid="empty-state">
                <span>
                  {tasks.length === 0
                    ? "Nenhuma tarefa nesta lista. Crie uma para começar!"
                    : "Todas as tarefas foram concluídas. Parabéns!"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
