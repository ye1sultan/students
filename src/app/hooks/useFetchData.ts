import { toast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";

const useFetchData = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
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
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
};

export default useFetchData;
