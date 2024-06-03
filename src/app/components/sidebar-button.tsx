import { ReactElement } from "react";

interface SidebarButtonProps {
  icon: ReactElement;
  text: string;
  className?: string;
  onClick?: () => void;
}

export const SidebarButton = ({
  icon,
  text,
  className,
  onClick,
}: SidebarButtonProps) => {
  return (
    <div
      className={`flex items-center space-x-3 p-2 hover:bg-neutral-200 rounded cursor-pointer ${className}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-lg">{text}</span>
    </div>
  );
};
