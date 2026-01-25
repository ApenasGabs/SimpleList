import type { ReactElement, ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type?: "info" | "success" | "warning" | "error";
  testId?: string;
}

/**
 * Componente de alerta com ícone
 *
 * @param children - Conteúdo do alerta
 * @param type - Tipo do alerta (info, success, warning, error)
 * @param testId - ID para testes
 */
export const Alert = ({
  children,
  type = "info",
  testId,
}: AlertProps): ReactElement => {
  const alertClasses: Record<string, string> = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  };

  const alertClass = alertClasses[type] || alertClasses.info;

  return (
    <div className={`alert ${alertClass}`} data-testid={testId} role="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current shrink-0 w-6 h-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>{children}</div>
    </div>
  );
};
