import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/ui/drawer-dialogue";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePerformLogout } from "@/services/authService";
import {
  useFetchBreeds,
  useFetchDogs,
  useSearchDogs,
} from "@/services/dogService";
import { useNavigate, useSearchParams } from "react-router";

export function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { mutateAsync, isPending: isLogoutPending } = usePerformLogout();
  const {
    isPending: isLoadingSearchData,
    isError: isSearchError,
    data: searchData,
  } = useSearchDogs(searchParams.toString());

  const dogIds = searchData?.resultIds;

  const {
    isPending: isLoadingDogs,
    isError: isDogsError,
    data: dogsData,
  } = useFetchDogs(dogIds ?? []);

  const {
    isPending: isLoadingBreeds,
    isError: isDogBreedsError,
    data: dogBreeds,
  } = useFetchBreeds();

  const handleNextResults = () => {
    if (searchData?.next) {
      setSearchParams(new URLSearchParams(searchData.next.split("?")[1]));
    }
  };

  const handlePrevResults = () => {
    if (searchData?.prev) {
      setSearchParams(new URLSearchParams(searchData.prev.split("?")[1]));
    }
  };

  if (isLoadingSearchData && isLoadingDogs) {
    return <div>LOADING...</div>;
  }

  return (
    <div>
      <div>SEARCH PAGE</div>
      <DrawerDialog breeds={dogBreeds || []} />
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
            <PaginationNext
              href="#"
              onClick={handleNextResults}
              className={
                !searchData?.next ? "pointer-events-none opacity-50" : ""
              }
            />
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
