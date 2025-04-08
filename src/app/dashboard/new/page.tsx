import Container from "@/components/container";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

// Criando formulário apenas com server component
export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: { userId: session?.user.id },
  });

  async function handleResgiter(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("costumer");

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        userId: session?.user.id,
        status: "ABERTO",
      },
    });

    redirect("/dashboard");
  }

  return (
    <main className="mt-9 mb-2">
      <Container>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>

          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleResgiter}>
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            type="text"
            placeholder="Digite o nome do chamado"
            required
            name="name"
            className="w-full border-2 border-slate-300 rounded outline-0 px-2 mb-2 h-11"
          />

          <label className="mb-1 font-medium text-lg">
            Descreva o problema:
          </label>
          <textarea
            placeholder="Descreva o problema..."
            required
            className="w-full border-2 border-slate-300 rounded outline-0 px-2 mb-2 h-24 resize-none"
            name="description"
          ></textarea>

          <label className="mb-1 font-medium text-lg">
            Selecione o cliente
          </label>
          {customers.length !== 0 ? (
            <select
              className="w-full border-2 border-slate-300 rounded outline-0 px-2 mb-2 h-11 bg-white"
              name="costumer"
            >
              <option value="">Selecione uma opção</option>
              {customers.map((custumer) => (
                <option key={custumer.id} value={custumer.id}>
                  {custumer.name}
                </option>
              ))}
            </select>
          ) : (
            <Link href="/dashboard/costumer/new">
              Você ainda não tem nenhum cliente{" "}
              <span className="text-blue-500 font-medium">
                Cadastrar cliente
              </span>
            </Link>
          )}

          <button
            disabled={customers.length === 0}
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded my-4 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Cadastrar
          </button>
        </form>
      </Container>
    </main>
  );
}
