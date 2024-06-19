import { CardButton } from "@/app/components/card-button";
import { Message, Mobility, Plan, Schedule } from "@/assets/icons/Icons";
import { useRouter } from "next/navigation";

export const HomePageButtons = () => {
  const router = useRouter();

  const handleRoute = (text: string) => {
    router.push(text);
  };

  return (
    <div className="w-full flex justify-center items-center gap-8">
      <CardButton onClick={() => handleRoute("/app/schedule")}>
        <Schedule className="w-16 h-16" />
        <p className="text-lg">Академиялык Күнтізбеге Өту</p>
      </CardButton>
      <CardButton onClick={() => handleRoute("/app/plan")}>
        <Plan className="w-16 h-16" />
        <p className="text-lg">Жеке оқу жоспары</p>
      </CardButton>
      <CardButton onClick={() => handleRoute("/app/mobility")}>
        <Mobility className="w-16 h-16" />
        <p className="text-lg">Академиялық ұтқырлық</p>
      </CardButton>
      <CardButton onClick={() => handleRoute("/app/review")}>
        <Message className="w-16 h-16" />
        <p className="text-lg">Ақпараттық көмек</p>
      </CardButton>
    </div>
  );
};
