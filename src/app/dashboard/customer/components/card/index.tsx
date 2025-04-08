"use client";
import { api } from "@/lib/api";
import { CostumerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export default function CardCostumer({
  customer,
}: {
  customer: CostumerProps;
}) {
  const router = useRouter();

  async function handleDelete() {
    await api.delete(`/api/customer`, {
      params: {
        id: customer.id,
      },
      withCredentials: true,
    });

    router.refresh();
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 border-slate-300 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <span className="font-bold">Nome:</span> {customer.name}
      </h2>
      <p>
        <span className="font-bold">E-mail:</span> {customer.email}
      </p>
      <p>
        <span className="font-bold">Telefone:</span> {customer.phone}
      </p>

      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-end"
        onClick={handleDelete}
      >
        Deletar
      </button>
    </article>
  );
}
