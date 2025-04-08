"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { FiSearch, FiX } from "react-icons/fi";
import FormTicket from "./components/FormTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite um e-mail válido.")
    .min(1, "Este campo é obrigatório."),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCostumer(data: FormData) {
    const res = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    });

    if (!res.data) {
      setError("email", {
        type: "custom",
        message: "Ops, cliente não encontrado",
      });
      return;
    }
    setCustomer(res.data);
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <>
            <div className="py-6 px-4 rounded border-2 border-slate-200 flex items-center justify-between">
              <p className="text-lg">
                <strong>Cliente selecionado: </strong>
                {customer.name}
              </p>
              <button
                className="bg-red-600 h-11 px-2 flex items-center justify-center rounded"
                onClick={handleClearCustomer}
              >
                <FiX size={24} color="#FFF" />
              </button>
            </div>
            <FormTicket customerId={customer.id} />
          </>
        ) : (
          <form
            className=" py-6 px-2 rounded border-2 border-slate-200"
            onSubmit={handleSubmit(handleSearchCostumer)}
          >
            <div className="flex flex-col gap-3">
              <Input
                label="E-mail"
                name="email"
                id="email"
                placeholder="Digite o e-mail do cliente"
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold bg-blue-500"
              >
                Procurar cliente
                <FiSearch size={20} color="#FFF" />
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
