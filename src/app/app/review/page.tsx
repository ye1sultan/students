"use client";

import { useState } from "react";

export default function Review() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = async () => {
    setError("");
    if (!name || !email || !userMessage) {
      setError("Барлық өрістерді толтырыңыз!");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Жарамды электронды пошта мекенжайын енгізіңіз!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message: userMessage }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Рахмет, сізге міндетті түрде жауап береміз!");
      } else {
        setError("Өкінішке орай қызмет өшіп тұр.");
        console.error(`Failed to send email: ${data.error}`);
      }
    } catch (error) {
      setError("Өкінішке орай қызмет өшіп тұр.");
      console.error(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-start justify-start gap-8 px-12 py-6 text-neutral-950">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">
          Пікір немесе сұрақ қалдырып кетініз!
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Толық аты-жөнініз
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Электронды поштаныз
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium text-gray-700">
            Пікір немесе сұрағынызды толықтай жазып кетініз
          </label>
          <textarea
            id="message"
            value={userMessage}
            rows={5}
            onChange={(e) => setUserMessage(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          onClick={sendEmail}
          disabled={loading}
          className="w-full bg-primary text-white p-2 rounded-md"
        >
          {loading ? "Жіберілуде..." : "Жіберу"}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
