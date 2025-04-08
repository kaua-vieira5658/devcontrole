"use client";
import { CostumerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
  ticket: TicketProps;
  costumer: CostumerProps | null;
}

export default function TicketItem({ costumer, ticket }: TicketItemProps) {
  const { handleModalVisible, setDetailsTicket } = useContext(ModalContext);
  const router = useRouter();

  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();

    if (costumer)
      setDetailsTicket({
        costumer,
        ticket,
      });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-gray-200 duration-200">
        <td className="text-left pl-2">{costumer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded text-white">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-3" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#131313" />
          </button>

          <button onClick={handleOpenModal}>
            <FiFile size={24} color="#3B82F6" />
          </button>
        </td>
      </tr>
    </>
  );
}
