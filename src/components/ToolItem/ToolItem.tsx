import type { ReactElement } from "react";

interface ToolItemProps {
  icon: string;
  name: string;
  version: string;
}

/**
 * Item de ferramenta com ícone, nome e versão
 *
 * @param icon - Emoji do ícone
 * @param name - Nome da ferramenta
 * @param version - Versão da ferramenta
 */
export const ToolItem = ({
  icon,
  name,
  version,
}: ToolItemProps): ReactElement => {
  return (
    <div className="flex items-center gap-4 p-4 bg-base-100 rounded-lg border border-base-300 hover:shadow-md transition-shadow">
      <span className="text-3xl shrink-0" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base-content text-base">{name}</p>
        <p className="text-sm text-base-content/60">v{version}</p>
      </div>
    </div>
  );
};
