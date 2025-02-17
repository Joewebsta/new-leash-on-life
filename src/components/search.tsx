import { Button } from "@/components/ui/button";
import { DrawerDialogDemo } from "@/components/ui/drawer-dialogue";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePerformLogout } from "@/services/authService";
import { useFetchDogs, useSearchDogs } from "@/services/dogService";
import { useNavigate, useSearchParams } from "react-router";

export function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const handleNextResults = () => {
    if (searchData?.next) {
      navigate(searchData.next);
    }
  };

  const handlePrevResults = () => {
    if (searchData?.prev) {
      navigate(searchData.prev);
    }
  };

  if (isLoadingSearchData && isLoadingDogs) {
    return <div>LOADING...</div>;
  }

  return (
    <div>
      <div>SEARCH PAGE</div>
      <DrawerDialogDemo />
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
