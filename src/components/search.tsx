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
import { Heart } from "lucide-react";
import { Dog } from "@/types/types";

export function Search({
  selectedDogs,
  onUpdateSelectedDogs,
}: {
  selectedDogs: Set<Dog>;
  onUpdateSelectedDogs: (dog: Dog) => void;
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { mutateAsync: logoutAsync, isPending: isLogoutPending } =
    usePerformLogout();

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
      <Button
        onClick={() => navigate("/dogs/match")}
        disabled={selectedDogs.size === 0}
      >
        Find Match
      </Button>
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
        const isSelected = selectedDogs.has(dog);

        return (
          <div key={dog.id}>
            <button onMouseDown={() => onUpdateSelectedDogs(dog)}>
              <Heart fill={isSelected ? "red" : "white"} />
            </button>
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
            <p>{dog.name}</p>
            <p>{dog.breed}</p>
            <p>{dog.age}</p>
            <p>{dog.zip_code}</p>
          </div>
        );
      })}
      <Button
        onClick={async () => {
          try {
            await logoutAsync();
          } catch (error) {}
        }}
      >
        {isLogoutPending ? "PENDING" : "Logout"}
      </Button>
    </div>
  );
}
