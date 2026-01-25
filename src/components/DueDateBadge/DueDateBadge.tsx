import type { ReactElement } from "react";

interface DueDateBadgeProps {
  dueDate?: number;
  completed?: boolean;
  onClick?: () => void;
}

/**
 * Badge que exibe a data de vencimento com estilo
 *
 * @param dueDate - Timestamp em ms
 * @param completed - Se tarefa está completa
 * @param onClick - Callback ao clicar
 */
export const DueDateBadge = ({
  dueDate,
  completed = false,
  onClick,
}: DueDateBadgeProps): ReactElement | null => {
  if (!dueDate) return null;

  const dueDateObj = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  dueDateObj.setHours(0, 0, 0, 0);

  const isOverdue = dueDateObj < today && !completed;
  const isToday = dueDateObj.getTime() === today.getTime();
  const isSoon =
    !isOverdue && !isToday && dueDateObj <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const getBadgeClass = (): string => {
    if (completed) return "badge-neutral";
    if (isOverdue) return "badge-error";
    if (isToday) return "badge-warning";
    if (isSoon) return "badge-info";
    return "badge-ghost";
  };

  return (
    <button
      type="button"
      className={`badge ${getBadgeClass()} gap-1 cursor-pointer hover:opacity-80 transition-opacity`}
      onClick={onClick}
      title={`Vence em ${dueDateObj.toLocaleDateString("pt-BR")}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      {formatDate(dueDateObj)}
    </button>
  );
};
