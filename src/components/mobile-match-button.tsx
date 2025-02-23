import { Button } from "@/components/ui/button";
import { Dog } from "@/types/types";
import { SearchIcon } from "lucide-react";

interface MobileMatchButtonProps {
  selectedDogs: Set<Dog>;
  onNavigateToMatch: () => void;
}

export function MobileMatchButton({
  selectedDogs,
  onNavigateToMatch,
}: MobileMatchButtonProps) {
  return (
    <div className="fixed sm:hidden bottom-0 inset-x-0 p-6 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <Button
        onClick={onNavigateToMatch}
        disabled={selectedDogs.size === 0}
        className="w-full"
      >
        <SearchIcon />
        Find your pawfect match
      </Button>
    </div>
  );
}
