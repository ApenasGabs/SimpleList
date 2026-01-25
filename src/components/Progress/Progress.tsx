import type { ReactElement } from "react";

interface ProgressProps {
  value: number;
  max?: number;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

/**
 * Componente de barra de progresso com variantes
 *
 * @param value - Valor atual do progresso
 * @param max - Valor máximo (padrão: 100)
 * @param variant - Variante de cor
 * @param size - Tamanho da barra
 * @param className - Classes CSS adicionais
 */
export const Progress = ({
  value,
  max = 100,
  variant = "primary",
  size = "md",
  animated = false,
  className = "",
}: ProgressProps): ReactElement => {
  const sizeClasses: Record<string, string> = {
    sm: "progress-sm",
    md: "",
    lg: "progress-lg",
  };

  const variantClasses: Record<string, string> = {
    primary: "progress-primary",
    secondary: "progress-secondary",
    accent: "progress-accent",
    success: "progress-success",
    warning: "progress-warning",
    error: "progress-error",
    info: "progress-info",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const variantClass = variantClasses[variant] || variantClasses.primary;
  const animatedClass = animated ? "progress-animated" : "";

  const clampedValue = Math.min(value, max);
  return (
    <progress
      className={`progress ${variantClass} ${sizeClass} w-full ${animatedClass} ${className}`.trim()}
      value={clampedValue}
      max={max}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={max}
    ></progress>
  );
};
