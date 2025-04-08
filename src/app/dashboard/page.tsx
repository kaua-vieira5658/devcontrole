import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import TicketItem from "./componets/ticket";
import prismaClient from "@/lib/prisma";
import ButtonRefresh from "./componets/buttonRefresh";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/");

  const tickets = await prismaClient.ticket.findMany({
    where: {
      customer: {
        userId: session.user.id,
      },
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <main className="mt-9 mb-2">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <div className="flex items-center gap-3">
            <ButtonRefresh />
            <Link
              href="/dashboard/new"
              className="bg-blue-500 px-4 py-1 rounded text-white"
            >
              Abrir chamado
            </Link>
          </div>
        </div>

        <table className="min-w-full my-2 mt-8">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">
                CADASTRO
              </th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                costumer={ticket.customer}
                ticket={ticket}
                key={ticket.id}
              />
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <h1 className="text-gray-600 px-2 md:px-0">
            Nenhum ticket aberto foi encontrado...
          </h1>
        )}
      </Container>
    </main>
  );
}
