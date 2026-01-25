import type { LabelHTMLAttributes, ReactElement, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * Componente de label com variantes
 *
 * @param children - Conteúdo do label
 * @param required - Se o campo é obrigatório
 * @param disabled - Se o label está desabilitado
 * @param size - Tamanho do label
 */
export const Label = ({
  children,
  required = false,
  disabled = false,
  size = "md",
  className = "",
  ...props
}: LabelProps): ReactElement => {
  const sizeClasses: Record<string, string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <label
      className={`font-medium text-base-content ${sizeClass} ${disabledClass} ${className}`.trim()}
      {...props}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
};
