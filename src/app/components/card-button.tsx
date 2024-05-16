import { ReactNode } from "react";

export const CardButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="min-h-[230px] w-full bg-primary rounded-[4px] flex flex-col justify-evenly items-center shadow text-neutral-50 py-8"
    >
      {children}
    </button>
  );
};
