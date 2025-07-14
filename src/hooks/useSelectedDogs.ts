import { useState, useCallback } from "react";
import { Dog } from "@/types/types";

export function useSelectedDogs() {
  const MAX_SELECTED_DOGS = 100;

  const [selectedDogs, setSelectedDogs] = useState<Set<Dog>>(new Set());

  const toggleDog = useCallback(
    (dog: Dog) => {
      setSelectedDogs((prev) => {
        if (prev.size >= MAX_SELECTED_DOGS && !prev.has(dog)) {
          return prev; // No change, return same reference
        }

        if (prev.has(dog)) {
          const newSet = new Set(prev);
          newSet.delete(dog);
          return newSet;
        } else {
          const newSet = new Set(prev);
          newSet.add(dog);
          return newSet;
        }
      });
    },
    [MAX_SELECTED_DOGS]
  );

  const resetSelectedDogs = useCallback(() => {
    setSelectedDogs(new Set());
  }, []);

  return {
    selectedDogs: Array.from(selectedDogs),
    toggleDog,
    resetSelectedDogs,
  };
}
