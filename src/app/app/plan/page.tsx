"use client";

import { deleteSubjectFromSchedule, scheduleClass } from "@/app/api/api";
import { universityAtom } from "@/app/atoms/university";
import useAuth from "@/app/hooks/useAuth";
import useSubjectsAndSchedule from "@/app/hooks/useSubjectsAndSchedule";
import { Course } from "@/app/types/ICourse";
import { exportToExcel } from "@/app/utils/exportToExcel";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title";
import { Subject } from "./components/subject";

const maxCredits = 30;

export default function Plan() {
  useAuth();

  const { subjects, schedule, loading } = useSubjectsAndSchedule();
  console.log(subjects);

  const university = useAtomValue(universityAtom);

  const [selectedSubjects, setSelectedSubjects] = useState<Course[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    if (subjects.length > 0 && schedule.length > 0) {
      const selectedSubjectsFromSchedule = subjects.filter((subject) =>
        schedule.some((slot) => slot.subject_semester_id === subject.id)
      );
      setSelectedSubjects(selectedSubjectsFromSchedule);
      setTotalCredits(
        selectedSubjectsFromSchedule.reduce(
          (total, subject) => total + +subject.subject__credits,
          0
        )
      );
    }
  }, [subjects, schedule]);

  const handleSubjectSelect = async (subject: Course, isSelected: boolean) => {
    console.log(subject, isSelected);

    if (isSelected) {
      if (totalCredits + +subject.subject__credits <= maxCredits) {
        try {
          await scheduleClass(
            subject.semester__id,
            subject.id,
            subject.day_of_week,
            subject.start_time,
            subject.end_time
          );

          setSelectedSubjects((prev) => [...prev, subject]);
          setTotalCredits((prev) => prev + +subject.subject__credits);
          toast({
            title: "Сәтті",
            description: "Пән күнтізбеге енгізілді!",
            variant: "default",
          });
        } catch (error) {
          console.error("Error scheduling class:", error);
          toast({
            title: "Қате",
            description: "Пән күнтізбеге енгізілмеді",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Кредит саны шектеулі",
          description: "Лимиттан асып кеттініз",
          variant: "destructive",
        });
      }
    } else {
      const scheduleItem = schedule.find(
        (slot) => slot.subject_semester_id === subject.id
      );
      if (scheduleItem) {
        try {
          await deleteSubjectFromSchedule(scheduleItem.subject_semester_id);
          setSelectedSubjects((prev) =>
            prev.filter((s) => s.id !== subject.id)
          );
          setTotalCredits((prev) => prev - +subject.subject__credits);
          toast({
            title: "Сәтті",
            description: "Пән жойылды!",
            variant: "default",
          });
        } catch (error) {
          console.error("Error removing class:", error);
          toast({
            title: "Қате",
            description: "Пән жойылмады!",
            variant: "destructive",
          });
        }
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!subjects) {
    return <div>Error loading subjects</div>;
  }

  const universitySubjects = subjects.filter(
    (subject) => subject.subject__university__name === university
  );

  const handleExport = async () => {
    exportToExcel(selectedSubjects);
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Оқу Жоспары" />
      <div className="w-full max-w-2xl">
        {universitySubjects.length > 0 ? (
          <div className="mb-8">
            <div className="flex justify-between items-center w-full mb-2">
              <h2 className="text-2xl font-bold mb-4">{university}</h2>
              <button
                onClick={handleExport}
                className="bg-primary text-neutral-50 p-2 rounded"
              >
                Экспорт
              </button>
            </div>
            <div className="w-full grid grid-cols-1 gap-4">
              {universitySubjects.map((subject, index) => {
                const isSelected = selectedSubjects.some(
                  (s) => s.subject__id === subject.subject__id
                );
                return (
                  <Subject
                    key={index}
                    subject={subject}
                    isSelected={isSelected}
                    onSelect={handleSubjectSelect}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>No subjects available for your university.</div>
        )}
      </div>
      <Toaster />
    </main>
  );
}
