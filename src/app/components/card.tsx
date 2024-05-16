import { ReactNode } from "react";

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[230px] w-full p-6 bg-white rounded-[4px] flex justify-between items-center border border-neutral-300 shadow">
      {children}
    </div>
  );
};
