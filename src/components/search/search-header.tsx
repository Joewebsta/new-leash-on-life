import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/ui/drawer-dialogue";
import { Dog, ViewMode } from "@/types/types";
import { SearchIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "motion/react";

interface SearchHeaderProps {
  breeds: string[];
  selectedDogs: Dog[];
  onNavigateToMatch: () => void;
  onTabChange: (value: ViewMode) => void;
  activeTab: ViewMode;
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
        onValueChange={(value) => onTabChange(value as ViewMode)}
      >
        <TabsList>
          <TabsTrigger value="browse-all">Browse All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-3">
        <AnimatePresence mode="wait">
          {activeTab === "browse-all" && (
            <DrawerDialog key="filters-button" breeds={breeds} />
          )}
        </AnimatePresence>
        <motion.div
          animate={{
            width: selectedDogs.length > 0 ? 220 : 0,
            opacity: selectedDogs.length > 0 ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <Button
            onClick={onNavigateToMatch}
            disabled={selectedDogs.length === 0}
            className="hidden sm:inline-flex w-full"
          >
            <SearchIcon />
            Find your pawfect match
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
