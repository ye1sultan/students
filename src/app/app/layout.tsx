import type { Metadata } from "next";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Students",
  description: "Портал",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex flex-row w-full flex-grow bg-neutral-50">
        <Sidebar />
        <main className="flex-grow bg-neutral-100">{children}</main>
      </div>
    </>
  );
}
