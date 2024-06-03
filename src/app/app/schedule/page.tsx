"use client";

import { getSchedule } from "@/app/api/api";
import { FetchedSlot, ScheduleSlot } from "@/app/types/ISchedule";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title";

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
  const router = useRouter();
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
      return;
    }

    const fetchSchedule = async () => {
      try {
        const fetchedSchedule: FetchedSlot[] = await getSchedule();
        const processedSchedule: ScheduleSlot[] = timeSlots.map((time) => ({
          time,
        }));

        fetchedSchedule.forEach((slot) => {
          const timeIndex = processedSchedule.findIndex(
            (t) => t.time === slot.start_time
          );
          if (timeIndex !== -1) {
            const dayOfWeek = slot.day_of_week; // Keeping dayOfWeek as string
            processedSchedule[timeIndex][dayOfWeek] = {
              name: slot.subject_semester__subject__title,
              description: slot.subject_semester__subject__description,
            };
          }
        });

        setSchedule(processedSchedule);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      }
    };

    fetchSchedule();
  }, [router]);

  const renderSlotContent = (
    slot: string | { name: string; description: string }
  ) => {
    if (typeof slot === "object") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{slot.name}</TooltipTrigger>
            <TooltipContent side="right">
              <p>{slot.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return null;
  };

  return (
    <main className="flex w-full min-h-screen flex-col items-start justify-start gap-12 px-12 py-6 text-neutral-950">
      <PageTitle title="Күнтізбе" />
      <div className="overflow-hidden w-full rounded-lg border border-gray-200">
        <table className="min-w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-primary text-neutral-50 h-[60px]">
              <th className="w-20 p-2 font-bold border border-grey-500 text-left">
                Time
              </th>
              <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
                Дүйсембі
              </th>
              <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
                Сейсенбі
              </th>
              <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
                Сәрсенбі
              </th>
              <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
                Бейсенбі
              </th>
              <th className="w-1/5 p-2 font-bold border border-grey-500 text-left">
                Жұма
              </th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((slot, index) => (
              <tr
                key={index}
                className="bg-gray-100 border border-grey-500 h-[60px]"
              >
                <td className="p-2 border border-grey-500 text-left bg-primary text-neutral-50">
                  {slot.time}
                </td>
                <td className="w-1/5 p-2 border border-grey-500 text-center">
                  {renderSlotContent(slot?.Monday)}
                </td>
                <td className="w-1/5 p-2 border border-grey-500 text-center">
                  {renderSlotContent(slot?.Tuesday)}
                </td>
                <td className="w-1/5 p-2 border border-grey-500 text-center">
                  {renderSlotContent(slot?.Wednesday)}
                </td>
                <td className="w-1/5 p-2 border border-grey-500 text-center">
                  {renderSlotContent(slot?.Thursday)}
                </td>
                <td className="w-1/5 p-2 border border-grey-500 text-center">
                  {renderSlotContent(slot?.Friday)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
