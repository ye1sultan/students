import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MAIN_API } from "@/constants/const";
import { User } from "@/types/IUser";
import { getInitials } from "@/utils/getInitials";

interface StudentAvatarProps {
  user: User;
  className?: string;
}

export const StudentAvatar = ({ user, className }: StudentAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={`${MAIN_API}${user?.profile.avatar}` || ""}
        alt={`${user?.first_name} ${user?.last_name}`}
      />
      <AvatarFallback>
        {user ? getInitials(`${user?.first_name} ${user?.last_name}`) : "NN"}
      </AvatarFallback>
    </Avatar>
  );
};
