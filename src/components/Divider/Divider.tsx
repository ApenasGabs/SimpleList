import type { ReactElement, ReactNode } from "react";

interface DividerProps {
  children?: ReactNode;
  variant?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Componente de divisor com orientação customizável
 *
 * @param children - Conteúdo do meio do divisor (texto)
 * @param variant - Orientação (horizontal ou vertical)
 * @param className - Classes CSS adicionais
 */
export const Divider = ({
  children,
  variant = "horizontal",
  className = "",
}: DividerProps): ReactElement => {
  if (variant === "vertical") {
    return (
      <div
        className={`h-16 w-px bg-base-300 ${className}`.trim()}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (children) {
    return (
      <div
        className={`flex items-center gap-4 my-6 ${className}`.trim()}
        role="separator"
      >
        <div className="flex-1 h-px bg-base-300"></div>
        <span className="text-sm text-base-content/60 font-medium">
          {children}
        </span>
        <div className="flex-1 h-px bg-base-300"></div>
      </div>
    );
  }

  return (
    <div
      className={`h-px w-full bg-base-300 my-6 ${className}`.trim()}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};
