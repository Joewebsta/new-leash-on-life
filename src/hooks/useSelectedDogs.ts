import { useState } from "react";
import { Dog } from "@/types/types";

const MAX_SELECTED_DOGS = 100;

export function useSelectedDogs() {
  const [selectedDogs, setSelectedDogs] = useState<Set<Dog>>(new Set());

  const handleUpdateSelectedDogs = (dog: Dog) => {
    if (selectedDogs.size >= MAX_SELECTED_DOGS && !selectedDogs.has(dog)) {
      return;
    }

    if (selectedDogs.has(dog)) {
      const newSet = new Set(selectedDogs);
      newSet.delete(dog);
      setSelectedDogs(newSet);
    } else {
      setSelectedDogs(new Set([...selectedDogs, dog]));
    }
  };

  const handleResetSelectedDogs = () => setSelectedDogs(new Set());

  return {
    selectedDogs,
    handleUpdateSelectedDogs,
    handleResetSelectedDogs,
  };
}
