import { Button } from "@/components/ui/button";
import { usePerformLogout } from "@/services/authService";
import { useFetchDogs, useSearchDogs } from "@/services/dogService";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export function Search() {
  const [currentPath, setCurrentPath] = useState<string | undefined>();

  const { mutateAsync, isPending: isLogoutPending } = usePerformLogout();
  const {
    isPending: isLoadingSearchData,
    isError: isSearchError,
    data: searchData,
  } = useSearchDogs(currentPath);

  const dogIds = searchData?.resultIds;

  const {
    isPending: isLoadingDogs,
    isError: isDogsError,
    data: dogsData,
  } = useFetchDogs(dogIds ?? []);

  const handleNextResults = () => {
    if (searchData?.next) {
      setCurrentPath(searchData.next);
    }
  };

  const handlePrevResults = () => {
    if (searchData?.prev) {
      setCurrentPath(searchData.prev);
    }
  };

  if (isLoadingSearchData && isLoadingDogs) {
    return <div>LOADING...</div>;
  }

  return (
    <div>
      <div>SEARCH PAGE</div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevResults}
              className={
                !searchData?.prev ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNextResults} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {dogsData?.map((dog) => {
        return (
          <img
            key={dog.id}
            src={dog.img}
            alt={dog.name}
            style={{
              aspectRatio: "1 / 1",
              objectFit: "cover",
              width: "200px",
              height: "200px",
            }}
          />
        );
      })}
      <Button
        onClick={async () => {
          try {
            await mutateAsync();
          } catch (error) {}
        }}
      >
        {isLogoutPending ? "PENDING" : "Logout"}
      </Button>
    </div>
  );
}
