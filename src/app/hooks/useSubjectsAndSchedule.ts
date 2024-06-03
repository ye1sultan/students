import { getSubjects, getSchedule } from "@/app/api/api";
import { Course } from "@/app/types/ICourse";
import { FetchedSlot } from "@/app/types/ISchedule";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const useSubjectsAndSchedule = () => {
  const [subjects, setSubjects] = useState<Course[]>([]);
  const [schedule, setSchedule] = useState<FetchedSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedSubjects, fetchedSchedule] = await Promise.all([
          getSubjects(),
          getSchedule(),
        ]);

        setSubjects(fetchedSubjects);
        setSchedule(fetchedSchedule);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Қателік!",
          description: "Деректерді алу мүмкін болмады",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { subjects, schedule, loading };
};

export default useSubjectsAndSchedule;
