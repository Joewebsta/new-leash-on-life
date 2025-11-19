import { fetchBreeds, fetchDogs, identifyMatch, searchDogs } from "@/api/dogs";
import { useQuery } from "@tanstack/react-query";
import { FILTERS_FORM_CONSTANTS } from "@/constants/constants";

export function useSearchDogs(searchParams?: string) {
  const params =
    searchParams?.trim() ||
    `sort=${FILTERS_FORM_CONSTANTS.DEFAULT_SORT}&ageMin=${FILTERS_FORM_CONSTANTS.DEFAULT_AGE_MIN}&ageMax=${FILTERS_FORM_CONSTANTS.DEFAULT_AGE_MAX}`;

  return useQuery({
    queryKey: ["dogs", "search", { searchParams: params }],
    queryFn: () => searchDogs(params),
    enabled: true,
    retry: 2,
    retryDelay: 1000,
    meta: {
      onError: (error: Error) => {
        console.error("Search dogs query failed:", error.message);
      },
    },
  });
}

export function useFetchDogs(dogIds: string[]) {
  return useQuery({
    queryKey: ["dogs", "detail", { ids: dogIds }],
    queryFn: () => fetchDogs(dogIds),
    enabled: !!dogIds && dogIds.length > 0,
    retry: 2,
    retryDelay: 1000,
    meta: {
      onError: (error: Error) => {
        console.error("Fetch dogs query failed:", error.message);
      },
    },
  });
}

export function useFetchBreeds() {
  return useQuery({
    queryKey: ["dogs", "breeds"],
    queryFn: fetchBreeds,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - breeds rarely change
    gcTime: 48 * 60 * 60 * 1000, // Keep in cache for 48 hours
    refetchOnWindowFocus: false, // Breeds don't need real-time updates
    retry: 2,
    retryDelay: 1000,
    meta: {
      onError: (error: Error) => {
        console.error("Fetch breeds query failed:", error.message);
      },
    },
  });
}

export function useIdentifyMatch(
  dogIds: string[],
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["dogs", "match", { ids: dogIds }],
    queryFn: () => identifyMatch(dogIds),
    staleTime: 0, // Data is immediately stale, will always refetch
    gcTime: 0, // Remove from cache immediately after component unmounts
    refetchOnMount: "always", // Always refetch when component mounts
    ...options,
  });
}
