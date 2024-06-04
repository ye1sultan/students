/* eslint-disable @next/next/no-img-element */
"use client";

import { getUser } from "@/api/api";
import { PageTitle } from "@/app/components/page-title";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { User } from "@/types/IUser";
import { useEffect, useState } from "react";
import { AcademPlan } from "./academ-plan";
import { HomePageButtons } from "./componenets/home-page-button";
import { Welcome } from "./welcome";

export default function Home() {
  useAuth();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Қателік!",
          description: "Пайдаланушы деректерін алу мүмкін болмады",
          variant: "destructive",
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-8 px-12 py-6 text-neutral-950">
      <PageTitle title="Басты бет" />
      {user ? <Welcome user={user} /> : <Skeleton className="w-full h-[230px] rounded-[15px]"/>}
      <HomePageButtons />
      <AcademPlan />
    </main>
  );
}
