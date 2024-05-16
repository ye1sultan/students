"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "../../components/page-title";

export default function Notifications() {
  const router = useRouter();

  if (!localStorage.getItem("accessToken")) {
    router.push("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Хабарламалар" />
      <div>Сiзде 0 хабарлама</div>
    </main>
  );
}
