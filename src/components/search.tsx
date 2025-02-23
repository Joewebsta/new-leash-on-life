import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/ui/drawer-dialogue";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useFetchBreeds,
  useFetchDogs,
  useSearchDogs,
} from "@/services/dogService";
import { Dog } from "@/types/types";
import { Cake, Heart, MapPin, Search as SearchIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

export function Search({
  selectedDogs,
  onUpdateSelectedDogs,
}: {
  selectedDogs: Set<Dog>;
  onUpdateSelectedDogs: (dog: Dog) => void;
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div className="pb-[84px] sm:pb-0 px-6 md:px-10 xl:px-20">
      <div>
        <div className="py-6 gap-3 flex">
          <DrawerDialog breeds={dogBreeds || []} />
          <Button
            onClick={() => navigate("/dogs/match")}
            disabled={selectedDogs.size === 0}
            className="hidden sm:inline-flex"
          >
            <SearchIcon />
            Find Your Pawfect Match
          </Button>
        </div>
        <div className="grid gap-y-11 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {dogsData?.map((dog) => {
            const isSelected = selectedDogs.has(dog);

            return (
              <div key={dog.id} className="relative">
                <button
                  className="absolute top-3 right-3"
                  onMouseDown={() => onUpdateSelectedDogs(dog)}
                >
                  <Heart
                    size={28}
                    stroke="white"
                    fill={isSelected ? "red" : "rgba(0, 0, 0, 0.3)"}
                  />
                </button>
                <img
                  key={dog.id}
                  src={dog.img}
                  alt={dog.name}
                  className="rounded-xl mb-3"
                  // ADD THE STYLE ATTRIBUTE OBJECT TO CLASSNAME
                  style={{
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    width: "100%",
                    // height: "200px",
                  }}
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="text-2xl font-bold">{dog.name}</p>
                  <p className="text-lg truncate">{dog.breed}</p>
                  <p className="flex gap-1 text-neutral-500">
                    <Cake size={20} />
                    <span>
                      {dog.age < 1
                        ? "less than 1 year old"
                        : `${dog.age} year${dog.age === 1 ? "" : "s"} old`}
                    </span>
                  </p>
                  <p className="flex gap-1 text-neutral-500">
                    <MapPin size={20} />
                    <span>Zipcode: {dog.zip_code}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination className="py-6 ">
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
      </div>

      <div className="fixed sm:hidden bottom-0 inset-x-0 p-6 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          onClick={() => navigate("/dogs/match")}
          disabled={selectedDogs.size === 0}
          className="w-full"
        >
          <SearchIcon />
          Find Your Pawfect Match
        </Button>
      </div>
    </div>
  );
}
