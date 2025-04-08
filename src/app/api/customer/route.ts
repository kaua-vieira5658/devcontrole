import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerEmail = searchParams.get("email");

  try {
    if (!customerEmail) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 400 }
      );
    }

    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { name, email, phone, address } = await req.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address || "",
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return NextResponse.json(
      { error: "Failed to create new customer" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const session = await getServerSession(authOptions);

  const findTickets = await prismaClient.ticket.findFirst({
    where: { customerId: id },
  });

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await prismaClient.customer.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar deletar cliente:", error);
    return NextResponse.json(
      { error: "Failed delete customer" },
      { status: 500 }
    );
  }
}
