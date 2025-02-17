import { fetchDogs, searchDogs } from "@/api/dogs";
import { useQuery } from "@tanstack/react-query";

export function useSearchDogs(path?: string) {
  return useQuery({
    queryKey: ["dogs", "search", { path }],
    queryFn: () => searchDogs(path),
  });
}

export function useFetchDogs(dogIds: string[]) {
  return useQuery({
    queryKey: ["dogs", "detail", { ids: dogIds }],
    queryFn: () => fetchDogs(dogIds),
    enabled: !!dogIds,
  });
}
