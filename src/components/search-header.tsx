import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/ui/drawer-dialogue";
import { Dog } from "@/types/types";
import { SearchIcon } from "lucide-react";

interface SearchHeaderProps {
  breeds: string[];
  selectedDogs: Set<Dog>;
  onNavigateToMatch: () => void;
}

export function SearchHeader({
  breeds,
  selectedDogs,
  onNavigateToMatch,
}: SearchHeaderProps) {
  return (
    <div className="py-6 gap-3 flex">
      <DrawerDialog breeds={breeds} />
      <Button
        onClick={onNavigateToMatch}
        disabled={selectedDogs.size === 0}
        className="hidden sm:inline-flex"
      >
        <SearchIcon />
        Find Your Pawfect Match
      </Button>
    </div>
  );
}
