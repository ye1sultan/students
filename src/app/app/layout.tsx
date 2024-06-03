import type { Metadata } from "next";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-full`}>
        <Header />
        <div className="flex flex-row w-full flex-grow bg-neutral-50">
          <Sidebar />
          <main className="flex-grow bg-neutral-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
