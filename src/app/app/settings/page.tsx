/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

import { getUser } from "@/app/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  profile: {
    gpa: number;
    avatar: string;
    balance: string;
    university_name: string;
  };
}

export default function Settings() {
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

  const handleExit = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Баптаулар" />
      {user ? (
        <div className="flex flex-col items-center justify-between gap-12 p-6 border rounded bg-neutral-50 shadow w-[50%]">
          <div className="flex flex-col items-center gap-4">
            <img
              src={user.profile.avatar}
              alt={`${user.first_name}'s avatar`}
              className="w-24 h-24 rounded-full"
            />
            <h2 className="text-2xl font-bold">
              {user.first_name + " " + user.last_name}
            </h2>
          </div>
          <div className="flex flex-col justify-center items-start text-lg gap-2">
            <div className="flex items-baseline">
              <span className="text-gray-700 font-semibold mr-2">Логин:</span>
              <span className="text-gray-900">{user.username}</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-gray-700 font-semibold mr-2">
                Оқу орны:
              </span>
              <span className="text-gray-900">
                {user.profile.university_name}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-gray-700 font-semibold mr-2">GPA:</span>
              <span className="text-gray-900">{user.profile.gpa}</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-gray-700 font-semibold mr-2">Баланс:</span>
              <span className="text-gray-900">{user.profile.balance}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-4">
            {/* <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#41787e] transition w-[50%]">
              Құпия сөзді өзгерту
            </button> */}
            <button
              onClick={handleExit}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition w-[50%]"
            >
              Шығу
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between gap-12 p-6 border rounded bg-neutral-50 shadow w-[50%]">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="w-52 h-8 rounded-lg" />
          </div>
          <div className="flex flex-col justify-center items-start text-lg gap-2">
            <div className="flex items-baseline">
              <Skeleton className="w-52 h-6 rounded-lg" />
            </div>
            <div className="flex items-baseline">
              <Skeleton className="w-52 h-6 rounded-lg" />
            </div>
            <div className="flex items-baseline">
              <Skeleton className="w-52 h-6 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <Skeleton className="w-[50%] h-10 rounded-lg" />
            <Skeleton className="w-[50%] h-10 rounded-lg" />
          </div>
        </div>
      )}
      <Toaster />
    </main>
  );
}
