import { StudentAvatar } from "@/app/components/avatar";
import { User } from "@/types/IUser";
import { StudentInfo } from "./componenets/student-info";

export const Welcome = ({ user }: { user: User }) => {
  return (
    <div className="w-full flex justify-between items-center gap-8 text-neutral-50">
      <div className="w-3/5 h-[230px] bg-primary bg-gradient-to-tr from-primary to-gradient rounded-[15px] px-8 py-12">
        <div className="h-full w-full flex justify-between items-center">
          <div className="h-full flex flex-col justify-between items-start">
            <div className="text-sm text-neutral-200">24 Қантар, 2024</div>
            <div className="flex flex-col justify-center items-start">
              <div className="text-3xl">
                Қош Келдің, {user?.first_name} {user?.last_name}!
              </div>
              <div className="text-sm text-neutral-200">
                Сіздің оқу сапарыңыздың бастамасы!
              </div>
            </div>
          </div>
          <StudentAvatar user={user} className="w-36 h-36" />
        </div>
      </div>
      <div className="w-2/5 h-[230px] bg-primary bg-gradient-to-tr from-primary to-gradient rounded-[15px] py-8 px-16">
        <StudentInfo user={user} />
      </div>
    </div>
  );
};
