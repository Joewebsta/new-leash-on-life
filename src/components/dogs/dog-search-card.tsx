import { DogContent } from "@/components/dogs/dog-content";
import { Dog } from "@/types/types";
import { Heart } from "lucide-react";

interface DogCardProps {
  dog: Dog;
  isSelected: boolean;
  onSelect: (dog: Dog) => void;
}

export function DogSearchCard({ dog, isSelected, onSelect }: DogCardProps) {
  return (
    <div className="relative">
      <button
        className="absolute top-3 right-3 z-10"
        onMouseDown={() => onSelect(dog)}
      >
        <Heart
          size={28}
          stroke="white"
          fill={isSelected ? "red" : "rgba(0, 0, 0, 0.3)"}
        />
      </button>
      <DogContent dog={dog} />
    </div>
  );
}
