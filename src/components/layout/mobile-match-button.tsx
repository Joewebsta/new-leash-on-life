import { Button } from "@/components/ui/button";
import { Dog } from "@/types/types";
import { SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MobileMatchButtonProps {
  selectedDogs: Dog[];
  onNavigateToMatch: () => void;
}

export function MobileMatchButton({
  selectedDogs,
  onNavigateToMatch,
}: MobileMatchButtonProps) {
  return (
    <AnimatePresence>
      {selectedDogs.length > 0 && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed sm:hidden bottom-0 inset-x-0 p-6 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20"
        >
          <Button
            onClick={onNavigateToMatch}
            disabled={selectedDogs.length === 0}
            className="w-full"
          >
            <SearchIcon />
            Find your pawfect match
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
