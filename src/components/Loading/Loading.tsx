import type { ReactElement } from "react";

interface LoadingProps {
  variant?: "spinner" | "dots" | "bars" | "ring";
  size?: "sm" | "md" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info";
  label?: string;
  className?: string;
}

/**
 * Componente de loading/spinner com múltiplas variantes
 *
 * @param variant - Tipo de animação
 * @param size - Tamanho do spinner
 * @param color - Cor do spinner
 * @param label - Texto do loading
 * @param className - Classes CSS adicionais
 */
export const Loading = ({
  variant = "spinner",
  size = "md",
  color = "primary",
  label,
  className = "",
}: LoadingProps): ReactElement => {
  const sizeClasses: Record<string, string> = {
    sm: "loading-sm",
    md: "",
    lg: "loading-lg",
  };

  const colorClasses: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
    info: "text-info",
  };

  const variantClasses: Record<string, string> = {
    spinner: "loading-spinner",
    dots: "loading-dots",
    bars: "loading-bars",
    ring: "loading-ring",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const colorClass = colorClasses[color] || colorClasses.primary;
  const variantClass = variantClasses[variant] || variantClasses.spinner;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`.trim()}
    >
      <span
        className={`loading ${variantClass} ${sizeClass} ${colorClass}`}
        role="status"
        aria-label={label || "Carregando"}
      />
      {label && <p className="text-sm text-base-content/60">{label}</p>}
    </div>
  );
};
