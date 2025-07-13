import { DogGrid } from "@/components/dog-grid";
import { EmptyFavorites } from "@/components/empty-favorites";
import { ErrorState } from "@/components/error-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { SearchPageLayout } from "@/components/search-page-layout";
import { SearchPagination } from "@/components/search-pagination";
import {
  useFetchBreeds,
  useFetchDogs,
  useSearchDogs,
} from "@/services/dogService";
import { Dog } from "@/types/types";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

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
    return <LoadingSkeleton />;
  }

  if (isSearchError || isDogsError) {
    return <ErrorState />;
  }

  if (activeTab === "favorites") {
    const favoriteDogs = Array.from(selectedDogs);

    return (
      <SearchPageLayout
        breeds={dogBreeds || []}
        selectedDogs={selectedDogs}
        onNavigateToMatch={() => navigate("/dogs/match")}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      >
        {favoriteDogs.length === 0 ? (
          <EmptyFavorites onBrowseAll={() => setActiveTab("browse-all")} />
        ) : (
          <DogGrid
            dogs={favoriteDogs}
            selectedDogs={selectedDogs}
            onUpdateSelectedDogs={onUpdateSelectedDogs}
          />
        )}
      </SearchPageLayout>
    );
  }

  // Browse-all tab
  return (
    <SearchPageLayout
      breeds={dogBreeds || []}
      selectedDogs={selectedDogs}
      onNavigateToMatch={() => navigate("/dogs/match")}
      onTabChange={handleTabChange}
      activeTab={activeTab}
    >
      <DogGrid
        dogs={dogsData || []}
        selectedDogs={selectedDogs}
        onUpdateSelectedDogs={onUpdateSelectedDogs}
      />
      {searchData && <SearchPagination searchData={searchData} />}
    </SearchPageLayout>
  );
}
