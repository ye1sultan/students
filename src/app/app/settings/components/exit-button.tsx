import { useRouter } from "next/navigation";

export const ExitButton = () => {
  const router = useRouter();

  const handleExit = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center w-full gap-4 mt-6">
      <button
        onClick={handleExit}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition w-full"
      >
        Шығу
      </button>
    </div>
  );
};
