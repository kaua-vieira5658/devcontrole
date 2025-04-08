"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

import { Input, InputWithMask } from "@/components/input"; // Inputs

const schema = z.object({
  name: z.string().min(1, "O campo nome é obirgatório."),
  email: z
    .string()
    .email("Digite um email válido.")
    .min(1, "O e-mail é obrigatório,"),
  phone: z.string().refine(
    (value) => {
      return /^\(\d{2}\) \d{5}-\d{4}$/.test(value);
    },
    {
      message: "O número de telefone deve estar no formato (xx) xxxxx-xxxx",
    }
  ),
  address: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewCostumerForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegister(data: FormData) {
    await api.post("/api/customer", data);

    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col mt-6"
    >
      <Input
        type="text"
        label="Nome completo"
        placeholder="Digite o nome completo..."
        name="name"
        error={errors.name?.message}
        register={register}
      />

      <Input
        type="email"
        label="E-mail"
        placeholder="Digite o email..."
        name="email"
        error={errors.email?.message}
        register={register}
      />

      <Input
        type="text"
        label="Endereço"
        placeholder="Digite o endereço..."
        name="address"
        error={errors.address?.message}
        register={register}
      />

      <InputWithMask
        name="phone"
        label="Telefone"
        mask="(__) _____-____"
        replacement={{ _: /\d/ }}
        placeholder="(xx) xxxxx-xxxx"
        error={errors.phone?.message}
        register={register}
      />

      <button
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:opacity-65 duration-200"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}
