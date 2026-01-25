import type { ReactElement } from "react";
import { useState } from "react";
import { useApp } from "../../context";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { useAlertModal, useConfirmModal } from "../Modal/useModal";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
/**
 * Componente para gerenciar listas (criar, editar, deletar, navegar)
 * Issue #4 - Gerenciamento de Listas e Navegação
 */
export const ListManager = (): ReactElement => {
  const { lists, activeListId, setActiveList, createList, deleteList } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const { alert, AlertModal } = useAlertModal();
  const { confirm, ConfirmModal } = useConfirmModal();

  const handleCreateList = (): void => {
    setIsCreateModalOpen(true);
  };

  const handleConfirmCreate = (): void => {
    const title = newListTitle.trim();
    if (title) {
      createList(title);
      setNewListTitle("");
      setIsCreateModalOpen(false);
    }
  };

  const handleCancelCreate = (): void => {
    setNewListTitle("");
    setIsCreateModalOpen(false);
  };

  const handleDeleteList = async (id: string): Promise<void> => {
    if (id === "default-inbox") {
      alert("Não é possível deletar a lista Inbox");
      return;
    }

    const confirmed = await confirm(
      "Tem certeza que deseja deletar esta lista? As tarefas serão removidas.",
      "Deletar lista",
    );
    if (confirmed) {
      deleteList(id);
    }
  };

  return (
    <aside className="w-full md:w-64 bg-base-100 border-r border-base-300 p-4">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold mb-2">Minhas Listas</h2>
          <Button variant="primary" size="sm" onClick={handleCreateList} className="w-full">
            + Nova Lista
          </Button>
        </div>

        <nav className="space-y-1">
          {lists.map((list) => (
            <div
              key={list.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                activeListId === list.id ? "bg-primary text-primary-content" : "hover:bg-base-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveList(list.id)}
                className="flex-1 text-left"
                data-testid={`list-btn-${list.id}`}
              >
                <span className="font-medium">{list.title}</span>
              </button>
              {list.id !== "default-inbox" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteList(list.id);
                  }}
                  className="btn btn-ghost btn-xs ml-2"
                  aria-label={`Deletar ${list.title}`}
                  data-testid={`delete-list-${list.id}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>

      <AlertModal />
      <ConfirmModal />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCancelCreate}
        title="Nova lista"
        size="md"
        actions={
          <>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCancelCreate}
              data-testid="cancel-create-list"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirmCreate}
              disabled={!newListTitle.trim()}
              data-testid="confirm-create-list"
            >
              Criar
            </button>
          </>
        }
      >
        <div className="form-control w-full">
          <Label htmlFor="list-title-input" className="label">
            <span className="label-text">Nome da lista</span>
          </Label>
          <Input
            id="list-title-input"
            type="text"
            placeholder="Digite o nome da lista..."
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newListTitle.trim()) {
                handleConfirmCreate();
              }
            }}
            data-testid="list-title-input"
            autoFocus
          />
        </div>
      </Modal>
    </aside>
  );
};
