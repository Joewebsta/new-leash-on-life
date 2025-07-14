import { DogGrid } from "@/components/dogs/dog-grid";
import { EmptyFavorites } from "@/components/empty-favorites";
import { ErrorState } from "@/components/error-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { SearchPageLayout } from "@/components/search/search-page-layout";
import { SearchPagination } from "@/components/search/search-pagination";
import { useSearchPageData } from "@/hooks/useSearchPageData";
import { Dog, ViewMode } from "@/types/types";
import { useState } from "react";
import { useNavigate } from "react-router";

interface SearchPageProps {
  selectedDogs: Dog[];
  onUpdateSelectedDogs: (dog: Dog) => void;
}

export function SearchPage({
  selectedDogs,
  onUpdateSelectedDogs,
}: SearchPageProps) {
  // Navigation & routing
  const navigate = useNavigate();

  // Local state
  const [activeTab, setActiveTab] = useState<ViewMode>("browse-all");

  // Event handlers
  const handleTabChange = (value: ViewMode) => {
    setActiveTab(value);
  };

  // Data fetching
  const { isLoading, isError, searchData, dogsData, breedsData } =
    useSearchPageData();

  // Loading and error states
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorState />;
  }

  // Favorites tab
  if (activeTab === "favorites") {
    return (
      <SearchPageLayout
        breeds={breedsData || []}
        selectedDogs={selectedDogs}
        onNavigateToMatch={() => navigate("/dogs/match")}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      >
        {selectedDogs.length === 0 ? (
          <EmptyFavorites onBrowseAll={() => setActiveTab("browse-all")} />
        ) : (
          <DogGrid
            dogs={selectedDogs}
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
      breeds={breedsData || []}
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
