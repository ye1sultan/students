"use client";

import { getSchedule } from "@/api/api";
import { universityAtom } from "@/atoms/university";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { FetchedSlot, ScheduleSlot } from "@/types/ISchedule";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title";
import { StudentUniSchedule } from "./student-uni-schedule";

const timeSlots = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
];

export default function Schedule() {
  useAuth();

  const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
  const [mobilitySchedule, setMobilitySchedule] = useState<ScheduleSlot[]>([]);
  const [activeTab, setActiveTab] = useState("subject");

  const university = useAtomValue(universityAtom);

  const filterMobilitySubjects = (
    schedule: FetchedSlot[],
    university: string | null
  ) => {
    return schedule.filter((slot) => {
      return slot.subject_semester__subject__university__name !== university;
    });
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const fetchedSchedule: FetchedSlot[] = await getSchedule();
        console.log(fetchedSchedule);
        const processedSchedule: ScheduleSlot[] = timeSlots.map((time) => ({
          time,
        }));

        fetchedSchedule.forEach((slot) => {
          const timeIndex = processedSchedule.findIndex(
            (t) => t.time === slot.start_time
          );
          if (timeIndex !== -1) {
            const dayOfWeek = slot.day_of_week;
            processedSchedule[timeIndex][dayOfWeek] = {
              name: slot.subject_semester__subject__title,
              description: slot.subject_semester__subject__description,
              university: slot.subject_semester__subject__university__name,
            };
          }
        });

        setSchedule(processedSchedule);

        const mobilitySubjects = filterMobilitySubjects(
          fetchedSchedule,
          university
        );
        const processedMobilitySchedule: ScheduleSlot[] = timeSlots.map(
          (time) => ({
            time,
          })
        );

        mobilitySubjects.forEach((slot) => {
          const timeIndex = processedMobilitySchedule.findIndex(
            (t) => t.time === slot.start_time
          );
          if (timeIndex !== -1) {
            const dayOfWeek = slot.day_of_week;
            processedMobilitySchedule[timeIndex][dayOfWeek] = {
              name: slot.subject_semester__subject__title,
              description: slot.subject_semester__subject__description,
              university: slot.subject_semester__subject__university__name,
            };
          }
        });

        setMobilitySchedule(processedMobilitySchedule);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      }
    };

    fetchSchedule();
  }, [university]);

  return (
    <main className="flex w-full min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Күнтізбе" />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="max-w-xl w-full mb-4">
          <TabsTrigger className="w-full text-lg" value="subject">
            {university}
          </TabsTrigger>
          <TabsTrigger className="w-full text-lg" value="semestr">
            Академиялық Ұтқырлық
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="subject">
          <StudentUniSchedule schedule={schedule} />
        </TabsContent>
        <TabsContent className="w-full" value="semestr">
          <StudentUniSchedule schedule={mobilitySchedule} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
