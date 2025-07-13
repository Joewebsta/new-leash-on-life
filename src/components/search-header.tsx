import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/ui/drawer-dialogue";
import { Dog } from "@/types/types";
import { SearchIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchHeaderProps {
  breeds: string[];
  selectedDogs: Set<Dog>;
  onNavigateToMatch: () => void;
  onTabChange: (value: "browse-all" | "favorites") => void;
  activeTab: "browse-all" | "favorites";
}

export function SearchHeader({
  breeds,
  selectedDogs,
  onNavigateToMatch,
  onTabChange,
  activeTab,
}: SearchHeaderProps) {
  return (
    <div className="py-6 flex justify-between">
      <Tabs
        value={activeTab}
        className="w-[400px]"
        onValueChange={(value) =>
          onTabChange(value as "browse-all" | "favorites")
        }
      >
        <TabsList>
          <TabsTrigger value="browse-all">Browse All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-3">
        <DrawerDialog breeds={breeds} />
        <Button
          onClick={onNavigateToMatch}
          disabled={selectedDogs.size === 0}
          className="hidden sm:inline-flex"
        >
          <SearchIcon />
          Find your pawfect match
        </Button>
      </div>
    </div>
  );
}
