import {
  useFetchBreeds,
  useFetchDogs,
  useSearchDogs,
} from "@/services/dogService";
import { useSearchParams } from "react-router";

export function useSearchPageData() {
  const [searchParams] = useSearchParams();

  const searchQuery = useSearchDogs(searchParams.toString());
  const dogIds = searchQuery.data?.resultIds;
  const dogsQuery = useFetchDogs(dogIds ?? []);
  const breedsQuery = useFetchBreeds();

  return {
    isLoading: searchQuery.isPending || dogsQuery.isPending || breedsQuery.isPending,
    isError: searchQuery.isError || dogsQuery.isError || breedsQuery.isError,
    searchData: searchQuery.data,
    dogsData: dogsQuery.data,
    breedsData: breedsQuery.data,
  };
}
