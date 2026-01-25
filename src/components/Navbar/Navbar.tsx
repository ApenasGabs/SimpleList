import type { ReactElement, ReactNode } from "react";

interface NavbarProps {
  title: string;
  children?: ReactNode;
}

/**
 * Componente de barra de navegação
 *
 * @param title - Título exibido na navbar
 * @param children - Elementos adicionais (ex: seletor de tema)
 */
export const Navbar = ({ title, children }: NavbarProps): ReactElement => {
  return (
    <nav className="navbar flex items-center justify-between bg-base-100 shadow-lg px-6 py-4">
      <div className="flex-1">
        <a
          className="text-xl font-bold text-base-content hover:text-primary transition-colors cursor-pointer"
          data-testid="navbar-title"
        >
          {title}
        </a>
      </div>
      <div className="flex items-center gap-4">{children}</div>
    </nav>
  );
};
