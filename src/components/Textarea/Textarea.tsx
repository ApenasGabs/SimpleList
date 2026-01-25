import type { ReactElement, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "bordered" | "filled" | "faded";
  size?: "sm" | "md" | "lg";
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

/**
 * Componente de textarea com variantes e validação
 *
 * @param variant - Variante do textarea
 * @param size - Tamanho do textarea
 * @param label - Label do textarea
 * @param error - Mensagem de erro
 * @param helperText - Texto auxiliar
 * @param rows - Número de linhas
 */
export const Textarea = ({
  variant = "bordered",
  size = "md",
  label,
  error,
  helperText,
  rows = 4,
  className = "",
  ...props
}: TextareaProps): ReactElement => {
  const variantClasses: Record<string, string> = {
    bordered: "textarea-bordered",
    filled: "textarea-filled",
    faded: "textarea-faded",
  };

  const sizeClasses: Record<string, string> = {
    sm: "textarea-sm",
    md: "",
    lg: "textarea-lg",
  };

  const variantClass = variantClasses[variant] || variantClasses.bordered;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const hasError = error ? "textarea-error" : "";

  return (
    <div className="w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        rows={rows}
        className={`textarea w-full ${variantClass} ${sizeClass} ${hasError} ${className}`.trim()}
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
