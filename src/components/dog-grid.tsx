import { DogSearchCard } from "@/components/dog-search-card";
import { Dog } from "@/types/types";

interface DogGridProps {
  dogs: Dog[];
  selectedDogs: Dog[];
  onUpdateSelectedDogs: (dog: Dog) => void;
}

export function DogGrid({
  dogs,
  selectedDogs,
  onUpdateSelectedDogs,
}: DogGridProps) {
  return (
    <div className="grid gap-y-11 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 pb-6">
      {dogs.map((dog) => (
        <DogSearchCard
          key={dog.id}
          dog={dog}
          isSelected={selectedDogs.some((d) => d.id === dog.id)}
          onSelect={onUpdateSelectedDogs}
        />
      ))}
    </div>
  );
}
