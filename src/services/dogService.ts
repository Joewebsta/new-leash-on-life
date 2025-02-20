import { fetchBreeds, fetchDogs, identifyMatch, searchDogs } from "@/api/dogs";
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

export function useFetchBreeds() {
  return useQuery({
    queryKey: ["dogs", "breeds"],
    queryFn: fetchBreeds,
  });
}

export function useIdentifyMatch(dogIds: string[]) {
  return useQuery({
    queryKey: ["dogs", "match", { ids: dogIds }],
    queryFn: () => identifyMatch(dogIds),
  });
}
