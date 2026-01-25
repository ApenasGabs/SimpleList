import type { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/**
 * Link externo com segurança e acessibilidade
 *
 * @param href - URL de destino
 * @param children - Conteúdo do link
 * @param className - Classes CSS adicionais
 */
export const ExternalLink = ({
  href,
  children,
  className = "",
  ...props
}: ExternalLinkProps): ReactElement => {
  const defaultClasses =
    className ||
    "text-primary hover:text-primary-focus underline transition-colors cursor-pointer";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={defaultClasses}
      {...props}
    >
      {children}
    </a>
  );
};
