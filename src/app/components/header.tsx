"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, QuestionMark } from "../assets/icons/Icons";

export const Header = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    const storedAvatar = localStorage.getItem("avatar");

    if (storedFullName) {
      setFullName(storedFullName);
    }
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  return (
    <div className="w-full h-20 bg-neutral-100 text-neutral-950 border-b-2 border-neutral-300">
      <div className="w-full h-full flex justify-between items-center px-12">
        <h1>Logo</h1>
        <div className="flex justify-center items-center gap-x-4">
          <a href="mailto:student@help.desk">
            <QuestionMark className="text-neutral-500 hover:text-primary" />
          </a>
          <button onClick={() => router.push("/app/notifications")}>
            <Bell className="text-neutral-500 hover:text-primary" />
          </button>
          <Separator orientation="vertical" className="h-8 w-[2px]" />
          <button
            onClick={() => router.push("/app/settings")}
            className="flex justify-center items-center gap-x-4 hover:text-primary"
          >
            <Avatar>
              <AvatarImage src={avatar || ""} alt="" />
              <AvatarFallback>
                {fullName
                  ? fullName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                  : "NN"}
              </AvatarFallback>
            </Avatar>
            <h1>{fullName || ""}</h1>
          </button>
        </div>
      </div>
    </div>
  );
};
