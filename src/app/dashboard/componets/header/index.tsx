"use client";
import Container from "@/components/container";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { path: "/dashboard", name: "Chamados" },
  { path: "/dashboard/customer", name: "Clientes" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 ">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`hover:font-bold duration-300 ${
              pathname === link.path ? "text-blue-200" : "text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </header>
    </Container>
  );
}
