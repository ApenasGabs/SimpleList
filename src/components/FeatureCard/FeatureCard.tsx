import type { ReactElement } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  version: string;
  href: string;
  variant: "primary" | "secondary" | "accent";
  testId?: string;
}

/**
 * Card de feature com link externo
 *
 * @param title - Título da feature
 * @param description - Descrição da feature
 * @param version - Versão da tecnologia
 * @param href - URL de destino
 * @param variant - Variante de cor do card
 * @param testId - ID para testes
 */
export const FeatureCard = ({
  title,
  description,
  version,
  href,
  variant,
  testId,
}: FeatureCardProps): ReactElement => {
  const variantStyles: Record<string, string> = {
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    accent: "bg-accent text-accent-content",
  };

  const colorClass = variantStyles[variant] || variantStyles.primary;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`rounded-lg border-2 border-current p-6 ${colorClass} hover:shadow-lg transition-shadow cursor-pointer`}
      data-testid={testId}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-3">{description}</p>
        <div className="border-t border-current my-2 w-full"></div>
        <p className="text-sm opacity-90">v{version}</p>
      </div>
    </a>
  );
};
