import { useContext } from "react";
import { ModalContext, modalType } from "../context/modal";

export function useModal() {
  const { isVisible, modalType, setIsVisible, setModalType } = useContext(ModalContext);

  const openModal = (modalType: modalType) => {
    if (typeof setIsVisible === "function" && typeof setModalType === "function") {
      setIsVisible(true);
      setModalType(modalType);
    }
  };

  const closeModal = () => {
    if (typeof setModalType === "function" && typeof setIsVisible === "function") {
      setModalType(null);
      setIsVisible(false);
    }
  };

  return {
    isVisible,
    modalType,
    openModal,
    closeModal,
  };
}
