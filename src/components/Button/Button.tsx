import type { ButtonHTMLAttributes, ReactElement } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
}

/**
 * Componente de botão reutilizável com suporte a diferentes variantes e tamanhos
 *
 * @param variant - Variante visual do botão (primary, secondary, accent, ghost)
 * @param size - Tamanho do botão (sm, md, lg)
 * @param children - Conteúdo do botão
 * @param className - Classes CSS adicionais
 */
export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps): ReactElement => {
  const sizeClasses: Record<string, string> = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  const variantClasses: Record<string, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    ghost: "btn-ghost",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const variantClass = variantClasses[variant] || variantClasses.primary;

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};
