import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import CardCostumer from "./components/card";
import prismaClient from "@/lib/prisma";

export default async function Costumer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/");

  const customers = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus clientes</h1>

          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Novo cliente
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-col-2 lg:grid-cols-3 gap-4 mt-2">
          {customers.length === 0 && (
            <h1>Você ainda não possui nenhum cliente adicionado.</h1>
          )}

          {customers.map((customer) => (
            <CardCostumer customer={customer} key={customer.id} />
          ))}
        </section>
      </main>
    </Container>
  );
}
