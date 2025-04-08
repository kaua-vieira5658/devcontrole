import Container from "@/components/container";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewCostumerForm from "../components/form";

export default async function NewCostumer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="flex flex-col mt-9 mb-2">
      <Container>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/custumer"
            className="bg-gray-900 px-4 py-1 text-white rounded"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo cliente</h1>
        </div>

        <NewCostumerForm />
      </Container>
    </main>
  );
}
