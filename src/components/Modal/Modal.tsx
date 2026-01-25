import type { MouseEvent, ReactElement, ReactNode } from "react";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: "sm" | "md" | "lg";
}

/**
 * Modal component usando dialog do daisyUI
 *
 * @param isOpen - Controla visibilidade do modal
 * @param onClose - Callback ao fechar modal
 * @param title - Título do modal (opcional)
 * @param children - Conteúdo do modal
 * @param actions - Botões de ação (opcional)
 * @param size - Tamanho do modal (padrão: md)
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = "md",
}: ModalProps): ReactElement => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>): void => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInDialog) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: "modal-box w-11/12 max-w-sm",
    md: "modal-box w-11/12 max-w-md",
    lg: "modal-box w-11/12 max-w-2xl",
  };

  return (
    <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
      <div className={sizeClasses[size]}>
        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}

        <div className="py-4">{children}</div>

        {actions && <div className="modal-action">{actions}</div>}

        <form method="dialog" className="modal-backdrop">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};
