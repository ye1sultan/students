"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Schedule } from "../assets/icons/Icons";
import { SidebarButton } from "./sidebar-button";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const buttons = [
    { path: "/app/home", text: "Басты Бет" },
    { path: "/app/plan", text: "Оқу Жоспары" },
    { path: "/app/schedule", text: "Күнтізбе" },
    { path: "/app/mobility", text: "Академиялық Ұтқырлық" },
    { path: "/app/notifications", text: "Хабарламалар" },
    { path: "/app/settings", text: "Баптаулар" },
  ];

  return (
    <div className="bg-neutral-50 text-neutral-950 border-r-2 border-neutral-300">
      <ul className="space-y-4 px-6 pt-4">
        {buttons.map((button) => (
          <SidebarButton
            key={button.path}
            icon={
              <Schedule
                className={`stroke-current ${
                  activePath === button.path ? "text-primary" : "text-gray-600"
                }`}
              />
            }
            text={button.text}
            className={
              activePath === button.path ? "text-primary" : "text-neutral-950"
            }
            onClick={() => router.push(button.path)}
          />
        ))}
      </ul>
    </div>
  );
};
