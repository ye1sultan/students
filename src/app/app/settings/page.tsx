/* eslint-disable @next/next/no-img-element */
"use client";

import { changeAvatar, getUser } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { MAIN_API } from "@/constants/const";
import useAuth from "@/hooks/useAuth";
import useFetchData from "@/hooks/useFetchData";
import { User } from "@/types/IUser";
import { Edit2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { PageTitle } from "../../components/page-title";
import { ChangePassword } from "./components/change-password";

export default function Settings() {
  useAuth();

  const { data: user, loading, refetch } = useFetchData<User>(getUser);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async () => {
    if (avatarFile) {
      try {
        await changeAvatar(avatarFile);
        toast({
          title: "Сәтті!",
          description: "Аватар сәтті өзгертілді",
          variant: "default",
        });
        refetch();
      } catch (error) {
        console.error("Error changing avatar:", error);
        toast({
          title: "Қателік!",
          description: "Аватарды өзгерту мүмкін болмады",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Баптаулар" />
      {loading ? (
        <div className="flex flex-col items-center justify-between gap-12 p-6 border rounded-[15px] bg-neutral-50 shadow w-full max-w-xl">
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
      ) : (
        <div className="flex flex-col items-center justify-between gap-12 p-6 border rounded-[15px] bg-neutral-50 shadow max-w-xl w-full">
          <div className="w-full flex items-center justify-center">
            <div className="relative">
              <img
                src={avatarPreview || `${MAIN_API}${user?.profile?.avatar}`}
                alt={`${user?.first_name}'s avatar`}
                className="w-32 h-32 rounded-full"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-0 right-0 rounded-full bg-primary h-10 w-10 text-white flex justify-center items-center"
              >
                <Edit2Icon className="h-4 w-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {avatarFile && (
            <button
              onClick={handleAvatarChange}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#41787e] transition"
            >
              Аватарды өзгерту
            </button>
          )}
          <div className="flex flex-col justify-center items-start text-lg gap-2 w-full">
            <h2 className="text-xl font-semibold mb-4">Жалпы информация</h2>
            <div className="w-full flex justify-between items-center gap-x-2">
              <div className="w-full flex flex-col justify-center items-start">
                <label htmlFor="fullName">Аты жөні:</label>
                <input
                  id="fullName"
                  type="text"
                  value={`${user?.first_name} ${user?.last_name}`}
                  className="w-full bg-transparent border-[1px] border-neutral-300 text-neutral-500 pl-2 cursor-not-allowed h-[40px] rounded-lg"
                  disabled
                />
              </div>
              <div className="w-full flex flex-col justify-center items-start">
                <label htmlFor="login">Логин:</label>
                <input
                  id="login"
                  type="text"
                  value={user?.username}
                  className="w-full bg-transparent border-[1px] border-neutral-300 text-neutral-500 pl-2 cursor-not-allowed h-[40px] rounded-lg"
                  disabled
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-start">
              <label htmlFor="university">Университет:</label>
              <input
                id="university"
                type="text"
                value={user?.profile?.university_name}
                className="w-full bg-transparent border-[1px] border-neutral-300 text-neutral-500 pl-2 cursor-not-allowed h-[40px] rounded-lg"
                disabled
              />
            </div>
          </div>
          <ChangePassword />
        </div>
      )}
      <Toaster />
    </main>
  );
}
