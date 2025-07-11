import { fetchLocations, searchLocations } from "@/api/locations";
import { LocationSearchParams } from "@/types/location";
import { useQuery } from "@tanstack/react-query";

export function useFetchLocations(zipCodes: string[]) {
  return useQuery({
    queryKey: ["locations", "detail", { zipCodes }],
    queryFn: () => fetchLocations(zipCodes),
    enabled: zipCodes.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchLocations(params: LocationSearchParams) {
  return useQuery({
    queryKey: ["locations", "search", params],
    queryFn: () => searchLocations(params),
    enabled: !!(params.city || params.states || params.geoBoundingBox),
    staleTime: 5 * 60 * 1000,
  });
}
