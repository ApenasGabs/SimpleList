import { useState } from "react";
import { Modal } from "./Modal";

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

interface AlertModalState {
  isOpen: boolean;
  title: string;
  message: string;
}

export const useConfirmModal = () => {
  const [state, setState] = useState<ConfirmModalState>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const confirm = (message: string, title = "Confirmar ação"): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title,
        message,
        onConfirm: () => {
          setState((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
      });
    });
  };

  const handleCancel = (): void => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  const ConfirmModal = () => (
    <Modal
      isOpen={state.isOpen}
      onClose={handleCancel}
      title={state.title}
      actions={
        <>
          <button type="button" className="btn btn-ghost" onClick={handleCancel}>
            Cancelar
          </button>
          <button type="button" className="btn btn-error" onClick={state.onConfirm}>
            Confirmar
          </button>
        </>
      }
    >
      <p>{state.message}</p>
    </Modal>
  );

  return { confirm, ConfirmModal };
};

export const useAlertModal = () => {
  const [state, setState] = useState<AlertModalState>({
    isOpen: false,
    title: "",
    message: "",
  });

  const alert = (message: string, title = "Aviso"): void => {
    setState({
      isOpen: true,
      title,
      message,
    });
  };

  const handleClose = (): void => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  const AlertModal = () => (
    <Modal
      isOpen={state.isOpen}
      onClose={handleClose}
      title={state.title}
      actions={
        <button type="button" className="btn btn-primary" onClick={handleClose}>
          OK
        </button>
      }
    >
      <p>{state.message}</p>
    </Modal>
  );

  return { alert, AlertModal };
};
