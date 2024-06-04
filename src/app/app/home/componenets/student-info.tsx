import { Dollar, Smile, User as UserIcon } from "@/assets/icons/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types/IUser";

const checkBalance = (balance: string) => {
  const balanceValue = parseFloat(balance.replace("₸", "").trim());
  if (balanceValue >= 0) {
    return "Жоқ";
  } else {
    return <span className="text-red-500">{balanceValue}₸</span>;
  }
};

export const StudentInfo = ({ user }: { user: User }) => {
  return (
    <div className="flex justify-between items-center w-full h-full">
      <div className="h-full flex flex-col justify-center items-center">
        <UserIcon className="h-16 w-16 mb-4 text-neutral-200" />
        <p className="text-neutral-200">Оқу орны</p>
        <p className="text-xl">{user.profile.university_name}</p>
      </div>
      <div className="h-full flex flex-col justify-center items-center">
        <Smile className="h-16 w-16 mb-4 text-neutral-200" />
        <p className="text-neutral-200">GPA</p>
        <p className="text-xl">{user.profile.gpa}</p>
      </div>
      <div className="h-full flex flex-col justify-center items-center">
        <Dollar className="h-16 w-16 mb-4 text-neutral-200" />
        <p className="text-neutral-200">Қарыздар</p>
        <p className="text-xl">{checkBalance(user.profile.balance)}</p>
      </div>
    </div>
  );
};
