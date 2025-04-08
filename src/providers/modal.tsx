"use client";
import { createContext, ReactNode, useState } from "react";
import { TicketProps } from "@/utils/ticket.type";
import { CostumerProps } from "@/utils/customer.type";
import ModalTicket from "@/components/modal";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfoProps | undefined;
  setDetailsTicket: (details: TicketInfoProps) => void;
}

interface TicketInfoProps {
  ticket: TicketProps;
  costumer: CostumerProps;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfoProps>();

  function handleModalVisible() {
    setVisible(!visible);
  }

  function setDetailsTicket(details: TicketInfoProps) {
    setTicket(details);
  }

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setDetailsTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};
