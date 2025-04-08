import { ReactNode } from "react";
import Header from "./componets/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
