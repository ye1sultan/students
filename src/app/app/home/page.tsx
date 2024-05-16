/* eslint-disable @next/next/no-img-element */
"use client";

import { getUser } from "@/app/api/api";
import {
  Dollar,
  Schedule,
  Smile,
  User as UserIcon,
} from "@/app/assets/icons/Icons";
import { Card } from "@/app/components/card";
import { CardButton } from "@/app/components/card-button";
import { PageTitle } from "@/app/components/page-title";
import { User } from "@/app/types/IUser";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  if (!localStorage.getItem("accessToken")) {
    router.push("/login");
  }

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

  const checkBalance = (balance: string) => {
    const balanceValue = parseFloat(balance.replace("₸", "").trim());
    if (balanceValue >= 0) {
      return "Жоқ";
    } else {
      return <span className="text-red-500">{balanceValue}₸</span>;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Басты бет" />
      <div className="w-full flex justify-center items-center gap-4">
        <Card>
          <h1 className="text-2xl">Қош Келдіңіз!</h1>
          <img
            src="https://picsum.photos/300/200"
            className="max-h-[150px]"
            alt=""
          />
        </Card>
        <Card>
          <div className="flex w-full items-center justify-around">
            {user ? (
              <>
                <div className="flex flex-col justify-center items-center">
                  <Smile className="h-16 w-16 mb-4" />
                  <p className="text-lg text-neutral-500">GPA</p>
                  <p className="text-2xl">{user.profile.gpa}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Dollar className="h-16 w-16 mb-4" />
                  <p className="text-lg text-neutral-500">Қарыздар</p>
                  <p className="text-2xl">
                    {checkBalance(user.profile.balance)}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <UserIcon className="h-16 w-16 mb-4" />
                  <p className="text-lg text-neutral-500">Оқу орны</p>
                  <p className="text-2xl">{user.profile.university_name}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center items-center">
                  <Smile className="h-16 w-16 mb-4" />
                  <p className="text-lg text-neutral-500">GPA</p>
                  <Skeleton className="w-32 h-6 rounded" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Dollar className="h-16 w-16 mb-4" />
                  <p className="text-lg text-neutral-500">Қарыздар</p>
                  <Skeleton className="w-32 h-6 rounded" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <UserIcon className="h-16 w-16 mb-4" />
                  <p className="text-lg text-neutral-500">Курс</p>
                  <Skeleton className="w-32 h-6 rounded" />
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
      <div className="w-full flex justify-center items-center gap-8">
        <CardButton onClick={() => router.push("/app/schedule")}>
          <Schedule className="w-16 h-16" />
          <p className="text-lg">Академиялык Күнтізбеге Өту</p>
        </CardButton>
        <CardButton onClick={() => router.push("/app/plan")}>
          <Schedule className="w-16 h-16" />
          <p className="text-lg">Жеке оқу жоспары</p>
        </CardButton>
        <CardButton onClick={() => router.push("/app/mobility")}>
          <Schedule className="w-16 h-16" />
          <p className="text-lg">Академиялық ұтқырлық</p>
        </CardButton>
        <CardButton onClick={() => router.push("/app/notifications")}>
          <Schedule className="w-16 h-16" />
          <p className="text-lg">Ақпараттық көмек</p>
        </CardButton>
      </div>
    </main>
  );
}
