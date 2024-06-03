"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAtom } from "jotai";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "../api/api";
import { Logo } from "../assets/icons/Icons";
import { universityAtom } from "../atoms/university";
import { MAIN_API } from "../constants/const";
import useFetchData from "../hooks/useFetchData";
import { User } from "../types/IUser";

export const Header = () => {
  const router = useRouter();
  const { data, loading } = useFetchData<User>(getUser);
  const [university, setUniversity] = useAtom(universityAtom);

  const handleExit = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setUniversity(data.profile.university_name);
    }
  }, [data, setUniversity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || Array.isArray(data)) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="w-full h-20 bg-neutral-100 text-neutral-950 border-b-2 border-neutral-300">
      <div className="w-full h-full flex justify-between items-center px-12">
        <Logo className="w-16 h-16 text-primary" />
        <div className="flex justify-center items-center gap-x-4">
          <button onClick={handleExit}>
            <LogOut className="text-red-500 h-5 w-5 rotate-180" />
          </button>
          <Separator orientation="vertical" className="h-8 w-[2px]" />
          <button
            onClick={() => router.push("/app/settings")}
            className="flex justify-center items-center gap-x-4 hover:text-primary"
          >
            <Avatar>
              <AvatarImage
                src={`${MAIN_API}${data.profile.avatar}` || ""}
                alt=""
              />
              <AvatarFallback>
                {`${data.first_name} ${data.last_name}`
                  ? `${data.first_name} ${data.last_name}`
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                  : "NN"}
              </AvatarFallback>
            </Avatar>
            <h1>{`${data.first_name} ${data.last_name}` || ""}</h1>
          </button>
        </div>
      </div>
    </div>
  );
};
