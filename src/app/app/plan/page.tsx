"use client";

import {
  deleteSubjectFromSchedule,
  getCapacity,
  scheduleClass,
} from "@/api/api";
import { universityAtom } from "@/atoms/university";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import useSubjectsAndSchedule from "@/hooks/useSubjectsAndSchedule";
import { Course } from "@/types/ICourse";
import { exportToExcel } from "@/utils/exportToExcel";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title";
import { Subject } from "./components/subject";

const maxCredits = 30;

export default function Plan() {
  useAuth();

  const { subjects, schedule, loading } = useSubjectsAndSchedule();
  const university = useAtomValue(universityAtom);

  const [selectedSubjects, setSelectedSubjects] = useState<Course[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [capacities, setCapacities] = useState<
    { id: number; capacity: number }[]
  >([]);

  useEffect(() => {
    const fetchCapacities = async () => {
      try {
        const capacities = await getCapacity();
        setCapacities(capacities);
      } catch (error) {
        console.error("Error fetching capacities:", error);
      }
    };

    fetchCapacities();
  }, []);

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
            title: "Сәтті!",
            description: "Пән күнтізбеге енгізілді!",
            variant: "default",
          });
        } catch (error) {
          console.error("Error scheduling class:", error);
          toast({
            title: "Қателік!",
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
            title: "Сәтті!",
            description: "Пән жойылды!",
            variant: "default",
          });
        } catch (error) {
          console.error("Error removing class:", error);
          toast({
            title: "Қателік!",
            description: "Пән жойылмады!",
            variant: "destructive",
          });
        }
      }
    }
  };

  if (!subjects) {
    toast({
      title: "Қателік!",
      description: "Оқу Жоспары жазылмады",
      variant: "destructive",
    });
    return ":(";
  }

  const universitySubjects = subjects.filter(
    (subject) => subject.subject__university__name === university
  );

  console.log(universitySubjects);

  const handleExport = async () => {
    exportToExcel(selectedSubjects);
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Оқу Жоспары" />
      <div className="w-full max-w-5xl">
        {loading ? (
          <Skeleton className="w-full h-[20px] p-4 border rounded-[15px] flex flex-col justify-center items-start" />
        ) : universitySubjects.length > 0 ? (
          <div className="mb-8">
            <div className="flex justify-between items-center w-full mb-2 px-4">
              <h2 className="text-2xl font-bold mb-4">{university}</h2>
              <button
                onClick={handleExport}
                className="bg-primary text-neutral-50 p-2 rounded-[8px]"
              >
                Экспорт
              </button>
            </div>
            <div className="w-full grid grid-cols-1 gap-4">
              {universitySubjects.map((subject, index) => {
                const isSelected = selectedSubjects.some(
                  (s) => s.subject__id === subject.subject__id
                );
                const subjectCapacity =
                  capacities.find((cap) => cap.id === subject.subject__id)
                    ?.capacity || 0;
                return (
                  <Subject
                    key={index}
                    subject={subject}
                    isSelected={isSelected}
                    onSelect={handleSubjectSelect}
                    capacity={subjectCapacity}
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
