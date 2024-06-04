import { changePassword } from "@/api/api";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ExitButton } from "./exit-button";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      await changePassword(currentPassword, newPassword);
      toast({
        title: "!",
        description: "Құпия сөзіңіз сәтті өзгертілді",
        variant: "default",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Қателік!",
        description: "Құпия сөзді өзгерту мүмкін болмады",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Құпия сөзді өзгерту</h2>
      <div className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Қазіргі құпия сөз"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full bg-transparent border-[1px] border-neutral-300 text-neutral-500 pl-2 h-[40px] rounded-lg"
        />
        <input
          type="password"
          placeholder="Жаңа құпия сөз"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full bg-transparent border-[1px] border-neutral-300 text-neutral-500 pl-2 h-[40px] rounded-lg"
        />
        <div className="w-full flex justify-between items-center gap-x-2">
          <ExitButton />
          <button
            onClick={handleChangePassword}
            className="self-end w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-[#41787e] transition"
          >
            Өзгерту
          </button>
        </div>
      </div>
    </div>
  );
};
