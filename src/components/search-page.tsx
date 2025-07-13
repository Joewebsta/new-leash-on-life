import { DogGrid } from "@/components/dog-grid";
import { DogGridSkeleton } from "@/components/skeletons/dog-grid-skeleton";
import { EmptyFavorites } from "@/components/empty-favorites";
import { MobileMatchButton } from "@/components/mobile-match-button";
import { MobileMatchButtonSkeleton } from "@/components/skeletons/mobile-match-button-skeleton";
import { SearchHeader } from "@/components/search-header";
import { HeaderSkeleton } from "@/components/skeletons/header-skeleton";
import { SearchPagination } from "@/components/search-pagination";
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

  if (isSearchError || isDogsError) {
    return (
      <div className="pb-[84px] sm:pb-0 px-6 md:px-10 xl:px-20 flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          <div className="p-4 mt-6 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              There was an error loading the search results. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "favorites") {
    const favoriteDogs = Array.from(selectedDogs);

    return (
      <div className="pb-[84px] sm:pb-0 px-6 md:px-10 xl:px-20 flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          <SearchHeader
            breeds={dogBreeds || []}
            selectedDogs={selectedDogs}
            onNavigateToMatch={() => navigate("/dogs/match")}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />

          {favoriteDogs.length === 0 ? (
            <EmptyFavorites onBrowseAll={() => setActiveTab("browse-all")} />
          ) : (
            <DogGrid
              dogs={favoriteDogs}
              selectedDogs={selectedDogs}
              onUpdateSelectedDogs={onUpdateSelectedDogs}
            />
          )}
        </div>

        <MobileMatchButton
          selectedDogs={selectedDogs}
          onNavigateToMatch={() => navigate("/dogs/match")}
        />
      </div>
    );
  }

  return (
    <div className="pb-[84px] sm:pb-0 px-6 md:px-10 xl:px-20 flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <SearchHeader
          breeds={dogBreeds || []}
          selectedDogs={selectedDogs}
          onNavigateToMatch={() => navigate("/dogs/match")}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />

        <DogGrid
          dogs={dogsData || []}
          selectedDogs={selectedDogs}
          onUpdateSelectedDogs={onUpdateSelectedDogs}
        />

        {searchData && <SearchPagination searchData={searchData} />}
      </div>

      <MobileMatchButton
        selectedDogs={selectedDogs}
        onNavigateToMatch={() => navigate("/dogs/match")}
      />
    </div>
  );
}
