import type { ReactElement } from "react";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  variant?: "bordered" | "filled" | "faded";
  size?: "sm" | "md" | "lg";
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Componente de input com variantes e validação
 *
 * @param variant - Variante do input
 * @param size - Tamanho do input
 * @param label - Label do input
 * @param error - Mensagem de erro
 * @param helperText - Texto auxiliar
 */
export const Input = ({
  variant = "bordered",
  size = "md",
  label,
  error,
  helperText,
  className = "",
  ...props
}: InputProps): ReactElement => {
  const variantClasses: Record<string, string> = {
    bordered: "input-bordered",
    filled: "input-filled",
    faded: "input-faded",
  };

  const sizeClasses: Record<string, string> = {
    sm: "input-sm",
    md: "",
    lg: "input-lg",
  };

  const variantClass = variantClasses[variant] || variantClasses.bordered;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const hasError = error ? "input-error" : "";

  return (
    <div className="w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        className={`input w-full ${variantClass} ${sizeClass} ${hasError} ${className}`.trim()}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
      {helperText && !error && (
        <label className="label">
          <span className="label-text-alt">{helperText}</span>
        </label>
      )}
    </div>
  );
};
