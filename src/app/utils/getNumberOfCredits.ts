import { getSchedule } from "@/app/api/api";
import { FetchedSlot } from "@/app/types/ISchedule";

export const getNumberOfCredits = async (): Promise<number> => {
  try {
    const fetchedSchedule: FetchedSlot[] = await getSchedule();
    const totalCredits = fetchedSchedule.reduce(
      (sum, slot) => sum + slot.subject_semester__subject__credits,
      0
    );
    return totalCredits;
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
    return 0;
  }
};
