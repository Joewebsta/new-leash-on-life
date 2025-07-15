import { fetchBreeds, fetchDogs, identifyMatch, searchDogs } from "@/api/dogs";
import { SearchData } from "@/types/types";
import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import React from "react";

function chunkZipCodes(searchParams: string, chunkSize: number) {
  const params = new URLSearchParams(searchParams);
  const zipCodes = params.getAll("zipCodes");

  if (zipCodes.length <= chunkSize) {
    return [searchParams]; // No chunking needed
  }

  // Create chunks
  const chunks = [];
  for (let i = 0; i < zipCodes.length; i += chunkSize) {
    const chunk = zipCodes.slice(i, i + chunkSize);

    // Create new params for this chunk
    const chunkParams = new URLSearchParams();

    // Add all non-zipCode params
    for (const [key, value] of params.entries()) {
      if (key !== "zipCodes") {
        chunkParams.append(key, value);
      }
    }

    // Add chunked zip codes
    chunk.forEach((zipCode) => chunkParams.append("zipCodes", zipCode));

    chunks.push(chunkParams.toString());
  }

  return chunks;
}

const combineSearchResults = (results: UseQueryResult<SearchData>[]) => {
  // Check if any query is pending
  const isPending = results.some((result) => result.isPending);

  // Check if any query has error
  const isError = results.some((result) => result.isPending);
  const error = results.find((result) => result.error)?.error;

  // If still loading, has error, or no results, return early
  if (isPending || isError || results.length === 0) {
    return {
      isPending,
      isError,
      error,
      data: undefined,
    };
  }

  // Combine all successful results
  const allResults = results
    .map((result) => result.data)
    .filter(Boolean) as SearchData[];

  if (allResults.length === 0) {
    return {
      isPending: false,
      isError: false,
      error: null,
      data: undefined,
    };
  }

  const combinedData: SearchData = {
    resultIds: allResults.flatMap((result) => result.resultIds || []),
    total: allResults.reduce((sum, result) => sum + result.total, 0),
    next: allResults[allResults.length - 1]?.next, // Use the last batch's next for pagination
    prev: allResults[0]?.prev, // Use the first batch's prev for pagination
  };

  return {
    isPending: false,
    isError: false,
    error: null,
    data: combinedData,
  };
};

export function useSearchDogs(searchParams?: string) {
  return useQuery({
    queryKey: ["dogs", "search", { searchParams }],
    queryFn: () => searchDogs(searchParams),
    enabled: !!searchParams?.trim(),
  });
}

// export function useSearchDogs(searchParams?: string) {
//   const searchParamsChunks = React.useMemo(() => {
//     if (!searchParams?.trim()) return [];
//     return chunkZipCodes(searchParams, 10);
//   }, [searchParams]);

//   return useQueries({
//     queries: searchParamsChunks.map((chunkParams, index) => ({
//       queryKey: ["dogs", "search", { searchParams: chunkParams, chunk: index }],
//       queryFn: () => searchDogs(chunkParams),
//       enabled: !!chunkParams.trim(),
//     })),
//     combine: combineSearchResults,
//   });
// }

export function useFetchDogs(dogIds: string[]) {
  return useQuery({
    queryKey: ["dogs", "detail", { ids: dogIds }],
    queryFn: () => fetchDogs(dogIds),
    enabled: !!dogIds && dogIds.length > 0,
  });
}

export function useFetchBreeds() {
  return useQuery({
    queryKey: ["dogs", "breeds"],
    queryFn: fetchBreeds,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - breeds rarely change
    gcTime: 48 * 60 * 60 * 1000, // Keep in cache for 48 hours
    refetchOnWindowFocus: false, // Breeds don't need real-time updates
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
