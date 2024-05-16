"use client";

import { getSubjects } from "@/app/api/api";
import { Course } from "@/app/types/ICourse";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title";

const maxCredits = 120;

export default function Plan() {
  const router = useRouter();

  if (!localStorage.getItem("accessToken")) {
    router.push("/login");
  }

  const [subjects, setSubjects] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjects = await getSubjects();
        setSubjects(subjects);

        console.log(subjects);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const groupedSubjects = subjects.reduce((acc, subject) => {
    const university = subject.subject__university__name;
    if (!acc[university]) {
      acc[university] = [];
    }
    acc[university].push(subject);
    return acc;
  }, {} as Record<string, typeof subjects>);

  const [selectedSubjects, setSelectedSubjects] = useState<typeof subjects>([]);
  const [totalCredits, setTotalCredits] = useState(0);

  const handleSubjectSelect = (
    subject: (typeof subjects)[0],
    isSelected: boolean
  ) => {
    if (isSelected) {
      if (totalCredits + subject.subject__credits <= maxCredits) {
        setSelectedSubjects((prev) => [...prev, subject]);
        setTotalCredits((prev) => prev + subject.subject__credits);
      } else {
        toast({
          title: "Кредит cаны",
          description: "Кредиттердің максималды саны асып кетті",
          variant: "destructive",
        });
      }
    } else {
      setSelectedSubjects((prev) => prev.filter((s) => s.id !== subject.id));
      setTotalCredits((prev) => prev - subject.subject__credits);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Оқу Жоспары" />
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Тандалған сабақтар</h2>
          <ul className="list-disc list-inside mt-4">
            {selectedSubjects.map((subject) => (
              <li key={subject.id}>
                {subject.subject__title} - {subject.subject__credits} кредит
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg">
            Жалпы кредит саны:{" "}
            <span className="font-semibold">{totalCredits}</span>
          </p>
        </div>
        {Object.entries(groupedSubjects).map(
          ([university, subjects]) =>
            university === localStorage.getItem("university") && (
              <div key={university} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{university}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {subjects.map((subject) => {
                    const isSelected = selectedSubjects.some(
                      (s) => s.subject__title === subject.subject__title
                    );
                    return (
                      <div
                        key={subject.id}
                        className={`p-4 border rounded flex justify-between ${
                          isSelected &&
                          !selectedSubjects.find((s) => s.id === subject.id)
                            ? "bg-gray-300"
                            : isSelected
                            ? "bg-blue-100"
                            : "bg-white"
                        }`}
                      >
                        <div>
                          <h3 className="text-lg font-semibold">
                            {subject.subject__title}
                          </h3>
                          <span className="text-neutral-500 text-sm">
                            {subject.day_of_week} - {subject.start_time}
                          </span>
                          <p className="text-gray-600">
                            {subject.subject__description}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-end">
                          <p className="text-neutral-500 text-sm">
                            Кредит саны: {subject.subject__credits}
                          </p>
                          <button
                            className={`mt-2 px-4 py-2 rounded ${
                              isSelected &&
                              !selectedSubjects.find((s) => s.id === subject.id)
                                ? "bg-gray-400 cursor-not-allowed"
                                : isSelected
                                ? "bg-red-500 hover:bg-red-700"
                                : "bg-primary hover:bg-[#41787e]"
                            } text-white ${
                              isSelected &&
                              !selectedSubjects.find((s) => s.id === subject.id)
                                ? "cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() =>
                              handleSubjectSelect(subject, !isSelected)
                            }
                            disabled={
                              isSelected &&
                              !selectedSubjects.find((s) => s.id === subject.id)
                            }
                          >
                            {isSelected &&
                            !selectedSubjects.find((s) => s.id === subject.id)
                              ? "Қол жетімсіз"
                              : isSelected
                              ? "Алып тастау"
                              : "Қосу"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
        )}
      </div>
      <Toaster />
    </main>
  );
}
