import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { api } from "@/lib/api";

const schema = z.object({
  name: z.string().min(1, "Este campo é obrigatório."),
  description: z.string().min(1, "Este campo é obrigatório."),
});

type FormData = z.infer<typeof schema>;

export default function FormTicket({ customerId }: { customerId: string }) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    await api.post("/api/ticket", {
      ...data,
      customerId: customerId,
    });

    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      className="mt-6 px-4 py-6 rounded border-2 border-slate-200"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <Input
        label="Nome do chamado"
        placeholder="Digite o nome do chamado..."
        name="name"
        error={errors.name?.message}
        id="name"
        register={register}
      />

      <label className="mb-1">Descreva o chamado</label>
      <textarea
        className="w-full border-2 border-slate-200 rounded h-24 resize-none px-2 outline-0"
        id="description"
        placeholder="Descreva o seu problema"
        {...register("description")}
      ></textarea>
      {errors.description && (
        <p className="text-red-500  mb-4">{errors.description.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 rounded w-full h-11 px-2 text-white font-bold"
      >
        Cadastrar
      </button>
    </form>
  );
}
