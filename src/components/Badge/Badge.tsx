import type { ReactElement, ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Componente de badge/label com múltiplas variantes
 *
 * @param children - Conteúdo do badge
 * @param variant - Variante de cor do badge
 * @param size - Tamanho do badge
 * @param className - Classes CSS adicionais
 */
export const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps): ReactElement => {
  const variantClasses: Record<string, string> = {
    default: "badge",
    primary: "badge-primary",
    secondary: "badge-secondary",
    accent: "badge-accent",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
    info: "badge-info",
  };

  const sizeClasses: Record<string, string> = {
    sm: "badge-sm",
    md: "",
    lg: "badge-lg",
  };

  const variantClass = variantClasses[variant] || variantClasses.default;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <span className={`badge ${variantClass} ${sizeClass} ${className}`.trim()}>
      {children}
    </span>
  );
};
