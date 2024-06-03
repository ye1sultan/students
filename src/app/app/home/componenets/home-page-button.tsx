import { Message, Mobility, Plan, Schedule } from "@/app/assets/icons/Icons";
import { CardButton } from "@/app/components/card-button";
import { useRouter } from "next/navigation";

export const HomePageButtons = () => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center items-center gap-8">
      <CardButton onClick={() => router.push("/app/schedule")}>
        <Schedule className="w-16 h-16" />
        <p className="text-lg">Академиялык Күнтізбеге Өту</p>
      </CardButton>
      <CardButton onClick={() => router.push("/app/plan")}>
        <Plan className="w-16 h-16" />
        <p className="text-lg">Жеке оқу жоспары</p>
      </CardButton>
      <CardButton onClick={() => router.push("/app/mobility")}>
        <Mobility className="w-16 h-16" />
        <p className="text-lg">Академиялық ұтқырлық</p>
      </CardButton>
      <CardButton onClick={() => router.push("/app/notifications")}>
        <Message className="w-16 h-16" />
        <p className="text-lg">Ақпараттық көмек</p>
      </CardButton>
    </div>
  );
};
