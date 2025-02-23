import { Dog } from "@/types/types";
import { Cake, MapPin } from "lucide-react";

interface DogCardProps {
  dog: Dog;
}

export function DogContent({ dog }: DogCardProps) {
  return (
    <>
      <img
        src={dog.img}
        alt={dog.name}
        className="rounded-xl mb-3 aspect-square object-cover w-full"
      />
      <div className="flex flex-col gap-[2px]">
        <p className="text-2xl font-bold">{dog.name}</p>
        <p className="text-lg truncate">{dog.breed}</p>
        <p className="flex gap-1 text-neutral-500">
          <Cake size={20} />
          <span>
            {dog.age < 1
              ? "less than 1 year old"
              : `${dog.age} year${dog.age === 1 ? "" : "s"} old`}
          </span>
        </p>
        <p className="flex gap-1 text-neutral-500">
          <MapPin size={20} />
          <span>Zipcode: {dog.zip_code}</span>
        </p>
      </div>
    </>
  );
}
