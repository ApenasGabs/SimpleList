import type { ReactElement, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  testId?: string;
}

/**
 * Componente de card básico
 *
 * @param children - Conteúdo do card
 * @param className - Classes CSS adicionais
 * @param testId - ID para testes
 */
export const Card = ({
  children,
  className = "",
  testId,
}: CardProps): ReactElement => {
  return (
    <div
      className={`rounded-lg border border-base-300 bg-base-100 shadow-lg ${className}`.trim()}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}

/**
 * Componente do corpo do card
 *
 * @param children - Conteúdo do corpo
 * @param centered - Se deve centralizar o conteúdo
 * @param className - Classes CSS adicionais
 */
export const CardBody = ({
  children,
  centered = false,
  className = "",
}: CardBodyProps): ReactElement => {
  const centerClass = centered
    ? "flex flex-col items-center justify-center text-center"
    : "";

  return (
    <div className={`p-6 ${centerClass} ${className}`.trim()}>{children}</div>
  );
};

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Componente do título do card
 *
 * @param children - Conteúdo do título
 * @param className - Classes CSS adicionais
 */
export const CardTitle = ({
  children,
  className = "",
}: CardTitleProps): ReactElement => {
  return (
    <h2 className={`text-2xl font-bold mb-4 ${className}`.trim()}>
      {children}
    </h2>
  );
};
