import { useContext } from "react";
import type { AppContextType } from "./AppContext";
import { AppContext } from "./AppContext";

/**
 * Hook para acessar o contexto global da aplicação
 *
 * @throws Error se usado fora do AppProvider
 */
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }

  return context;
};
