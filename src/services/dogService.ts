import { fetchDogs, searchDogs } from "@/api/dogs";
import { useQuery } from "@tanstack/react-query";

export function useSearchDogs(searchParams?: string) {
  return useQuery({
    queryKey: ["dogs", "search", { searchParams }],
    queryFn: () => searchDogs(searchParams),
  });
}

export function useFetchDogs(dogIds: string[]) {
  return useQuery({
    queryKey: ["dogs", "detail", { ids: dogIds }],
    queryFn: () => fetchDogs(dogIds),
    enabled: !!dogIds,
  });
}
