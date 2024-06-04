"use client";

import { login } from "@/api/api";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      console.log("Login successful:", data);

      localStorage.setItem("accessToken", data?.access);
      localStorage.setItem("university", data?.user?.profile?.university_name);

      router.push("/app/home");
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Қателік!",
        description:
          "Логин және құпия сөзіңізді тексеріп, әрекетті қайталаңыз.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex min-h-screen items-start pt-[10%] justify-center bg-gray-100 text-neutral-950">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Қош Келдіңіз!</h1>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="login"
          >
            Логин
          </label>
          <input
            type="text"
            id="login"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Құпия сөз
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="w-full py-2 px-4 bg-primary text-white rounded-md shadow-sm hover:bg-[#41787e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={handleLogin}
        >
          Кіру
        </button>
      </div>
      <Toaster />
    </main>
  );
}
