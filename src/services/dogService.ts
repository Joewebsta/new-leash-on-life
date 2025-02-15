import { fetchDogs, searchDogs } from "@/api/dogs";
import { useQuery } from "@tanstack/react-query";

export function useSearchDogs() {
  return useQuery({ queryKey: ["doggies"], queryFn: searchDogs });
}

export function useFetchDogs(dogIds: string[]) {
  return useQuery({
    queryKey: ["dogs", ...(dogIds || [])],
    queryFn: () => fetchDogs(dogIds),
    enabled: !!dogIds,
  });
}
