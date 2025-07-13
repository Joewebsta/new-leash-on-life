import { DogSearchCard } from "@/components/dog-search-card";
import { DogGridSkeleton } from "@/components/skeletons/dog-grid-skeleton";
import { MobileMatchButton } from "@/components/mobile-match-button";
import { MobileMatchButtonSkeleton } from "@/components/skeletons/mobile-match-button-skeleton";
import { SearchHeader } from "@/components/search-header";
import { HeaderSkeleton } from "@/components/skeletons/header-skeleton";
import { SearchPagination } from "@/components/search-pagination";
import { Button } from "@/components/ui/button";
import {
  useFetchBreeds,
  useFetchDogs,
  useSearchDogs,
} from "@/services/dogService";
import { Dog } from "@/types/types";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";

export function SearchPage({
  selectedDogs,
  onUpdateSelectedDogs,
}: {
  selectedDogs: Set<Dog>;
  onUpdateSelectedDogs: (dog: Dog) => void;
}) {
  const [activeTab, setActiveTab] = useState<"browse-all" | "favorites">(
    "browse-all"
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const { data: dogBreeds } = useFetchBreeds();

  const displayedDogs =
    activeTab === "favorites" ? Array.from(selectedDogs) : dogsData;

  const handleTabChange = (value: "browse-all" | "favorites") => {
    setActiveTab(value);
  };

  if (isLoadingSearchData || isLoadingDogs) {
    return (
      <div className="pb-[130px] px-6 md:px-10 xl:px-20">
        <HeaderSkeleton />
        <DogGridSkeleton />
        <MobileMatchButtonSkeleton />
      </div>
    );
  }

  return (
    <div className="pb-[84px] sm:pb-0 px-6 md:px-10 xl:px-20 flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        {(isSearchError || isDogsError) && (
          <div className="p-4 mt-6 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              There was an error loading the search results. Please try again.
            </p>
          </div>
        )}
        <SearchHeader
          breeds={dogBreeds || []}
          selectedDogs={selectedDogs}
          onNavigateToMatch={() => navigate("/dogs/match")}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />

        {activeTab === "favorites" && displayedDogs?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Favorites Yet
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Start browsing dogs and click the heart icon to add them to your
              favorites!
            </p>
            <Button
              onClick={() => setActiveTab("browse-all")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Browse All Dogs
            </Button>
          </div>
        ) : (
          <div className="grid gap-y-11 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 pb-6">
            {displayedDogs?.map((dog) => (
              <DogSearchCard
                key={dog.id}
                dog={dog}
                isSelected={selectedDogs.has(dog)}
                onSelect={onUpdateSelectedDogs}
              />
            ))}
          </div>
        )}

        {searchData && activeTab === "browse-all" && (
          <SearchPagination searchData={searchData} />
        )}
      </div>

      <MobileMatchButton
        selectedDogs={selectedDogs}
        onNavigateToMatch={() => navigate("/dogs/match")}
      />
    </div>
  );
}
