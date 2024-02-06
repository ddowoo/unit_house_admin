import React, { Context, ReactNode, createContext, useState } from "react";

export type modalType = "msgInput" | "tenantInfo";

const defaultValue: {
  isVisible: boolean;
  modalType: null | modalType;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType?: React.Dispatch<React.SetStateAction<modalType | null>>;
} = {
  isVisible: false,
  modalType: null,
};

export const ModalContext = createContext(defaultValue);

export default function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState<null | modalType>(null);

  return (
    <ModalContext.Provider
      value={{
        isVisible,
        modalType,
        setModalType,
        setIsVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
