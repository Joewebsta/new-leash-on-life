import { fetchLocations, searchLocations } from "@/api/location";
import { LocationSearchParams } from "../types/location";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFetchLocations(zipCodes: string[]) {
  return useQuery({
    queryKey: ["locations", "detail", { zipCodes }],
    queryFn: () => fetchLocations(zipCodes),
    enabled: zipCodes.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchLocationsMutation() {
  return useMutation({
    mutationFn: (params: LocationSearchParams) => searchLocations(params),
  });
}

export function useSearchLocationsQuery(params: LocationSearchParams) {
  return useQuery({
    queryKey: ["locations", "search", params],
    queryFn: () => searchLocations(params),
    staleTime: 5 * 60 * 1000,
  });
}
