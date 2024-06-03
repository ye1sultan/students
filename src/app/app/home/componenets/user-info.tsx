import { Dollar, Smile, User as UserIcon } from "@/app/assets/icons/Icons";
import { User } from "@/app/types/IUser";
import { Skeleton } from "@/components/ui/skeleton";

const checkBalance = (balance: string) => {
  const balanceValue = parseFloat(balance.replace("₸", "").trim());
  if (balanceValue >= 0) {
    return "Жоқ";
  } else {
    return <span className="text-red-500">{balanceValue}₸</span>;
  }
};

export const UserInfo = ({ user }: { user: User | undefined }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <UserIcon className="h-16 w-16 mb-4" />
        <p className="text-lg text-neutral-500">Оқу орны</p>
        {user ? (
          <p className="text-2xl">{user.profile.university_name}</p>
        ) : (
          <Skeleton className="w-32 h-6 rounded" />
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <Smile className="h-16 w-16 mb-4" />
        <p className="text-lg text-neutral-500">GPA</p>
        {user ? (
          <p className="text-2xl">{user.profile.gpa}</p>
        ) : (
          <Skeleton className="w-32 h-6 rounded" />
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <Dollar className="h-16 w-16 mb-4" />
        <p className="text-lg text-neutral-500">Қарыздар</p>
        {user ? (
          <p className="text-2xl">{checkBalance(user.profile.balance)}</p>
        ) : (
          <Skeleton className="w-32 h-6 rounded" />
        )}
      </div>
    </>
  );
};
