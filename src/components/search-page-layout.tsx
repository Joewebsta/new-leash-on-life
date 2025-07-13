import { MobileMatchButton } from "@/components/mobile-match-button";
import { SearchHeader } from "@/components/search-header";
import { Dog, ViewMode } from "@/types/types";
import { ReactNode } from "react";

interface SearchPageLayoutProps {
  children: ReactNode;
  breeds: string[];
  selectedDogs: Set<Dog>;
  onNavigateToMatch: () => void;
  onTabChange: (value: ViewMode) => void;
  activeTab: ViewMode;
}

export const SearchPageLayout = ({
  children,
  breeds,
  selectedDogs,
  onNavigateToMatch,
  onTabChange,
  activeTab,
}: SearchPageLayoutProps) => (
  <div className="pb-[84px] sm:pb-0 px-6 md:px-10 xl:px-20 flex flex-col flex-1">
    <div className="flex flex-col flex-1">
      <SearchHeader
        breeds={breeds}
        selectedDogs={selectedDogs}
        onNavigateToMatch={onNavigateToMatch}
        onTabChange={onTabChange}
        activeTab={activeTab}
      />
      {children}
    </div>
    <MobileMatchButton
      selectedDogs={selectedDogs}
      onNavigateToMatch={onNavigateToMatch}
    />
  </div>
);
