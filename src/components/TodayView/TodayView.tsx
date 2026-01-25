import { useMemo, useCallback } from "react";
import type { ReactElement } from "react";
import { useApp, type Task } from "../../context";
import { DueDateBadge } from "../DueDateBadge/DueDateBadge";

/**
 * Retorna data de hoje às 00:00:00 em timestamp
 */
const getTodayStart = (): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
};

/**
 * Componente para visualizar tarefas do dia e atrasadas
 * Issue #7 - Visão "Hoje" e Tarefas Pendentes
 */
export const TodayView = (): ReactElement => {
  const { tasks, updateTask, deleteTask } = useApp();
  const todayStart = getTodayStart();
  const tomorrowStart = todayStart + 24 * 60 * 60 * 1000;

  const { overdueTasks, todayTasks } = useMemo(() => {
    const activeTasks = tasks.filter((task) => !task.completed && task.dueDate);

    const overdue = activeTasks.filter((task) => task.dueDate! < todayStart);
    const today = activeTasks.filter(
      (task) => task.dueDate! >= todayStart && task.dueDate! < tomorrowStart,
    );

    return {
      overdueTasks: overdue.sort((a, b) => a.dueDate! - b.dueDate!),
      todayTasks: today.sort((a, b) => a.dueDate! - b.dueDate!),
    };
  }, [tasks, todayStart, tomorrowStart]);

  const handleToggleComplete = useCallback(
    (taskId: string): void => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const now = Date.now();
      updateTask(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? now : undefined,
      });
    },
    [tasks, updateTask],
  );

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

  const getBadgeTone = (task: Task): string => {
    if (task.completed) return "badge-ghost";
    if (task.priority === "high") return "badge-error";
    if (task.priority === "medium") return "badge-warning";
    return "badge-outline";
  };

  const renderTaskList = (taskList: Task[], title: string, emptyMessage: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        {title}
        <span className="badge badge-sm">{taskList.length}</span>
      </h3>

      {taskList.length === 0 ? (
        <div className="alert alert-info" data-testid={`empty-${title.toLowerCase()}`}>
          <span>{emptyMessage}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2" data-testid={`${title.toLowerCase()}-list`}>
          {taskList.map((task) => (
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
                <p className="text-sm font-medium truncate" data-testid={`task-title-${task.id}`}>
                  {task.title}
                </p>

                {task.description && (
                  <p className="text-xs text-base-content/60 truncate mt-0.5">{task.description}</p>
                )}

                <div className="flex items-center gap-2 mt-1 text-xs text-base-content/60 flex-wrap">
                  {task.priority && (
                    <span className={`badge badge-sm ${getBadgeTone(task)}`}>
                      {getPriorityLabel(task.priority)}
                    </span>
                  )}
                  {task.dueDate && (
                    <DueDateBadge dueDate={task.dueDate} completed={task.completed} />
                  )}
                </div>
              </div>

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
          ))}
        </div>
      )}
    </div>
  );

  const totalTasks = overdueTasks.length + todayTasks.length;

  return (
    <section className="w-full">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold" data-testid="today-view-title">
                📅 Hoje
              </h2>
              <span className="text-sm text-base-content/60">
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <div className="text-sm text-base-content/60" data-testid="total-tasks-count">
              {totalTasks} {totalTasks === 1 ? "tarefa" : "tarefas"}
            </div>
          </div>

          <div className="divider my-0"></div>

          {totalTasks === 0 ? (
            <div className="alert alert-success" data-testid="all-clear-message">
              <span>🎉 Você está em dia! Nenhuma tarefa vencida ou para hoje.</span>
            </div>
          ) : (
            <>
              {overdueTasks.length > 0 &&
                renderTaskList(overdueTasks, "⚠️ Atrasadas", "Nenhuma tarefa atrasada. Parabéns!")}

              {todayTasks.length > 0 &&
                renderTaskList(todayTasks, "📋 Para Hoje", "Nenhuma tarefa para hoje.")}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
