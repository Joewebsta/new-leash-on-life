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
import { Dog, ViewMode } from "@/types/types";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface SearchPageProps {
  selectedDogs: Set<Dog>;
  onUpdateSelectedDogs: (dog: Dog) => void;
}

export function SearchPage({
  selectedDogs,
  onUpdateSelectedDogs,
}: SearchPageProps) {
  // Navigation & routing
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Local state
  const [activeTab, setActiveTab] = useState<ViewMode>("browse-all");

  // Event handlers
  const handleTabChange = (value: ViewMode) => {
    setActiveTab(value);
  };

  // Data fetching
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

  // Loading and error states
  if (isLoadingSearchData || isLoadingDogs) {
    return <LoadingSkeleton />;
  }

  if (isSearchError || isDogsError) {
    return <ErrorState />;
  }

  // Favorites tab
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
