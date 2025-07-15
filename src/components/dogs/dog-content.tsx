import { useFetchLocations } from "@/services/locationService";
import { Dog } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Cake, MapPin } from "lucide-react";
import { useState } from "react";

interface DogCardProps {
  dog: Dog;
}

export function DogContent({ dog }: DogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data: locationData, isLoading: isLocationLoading } =
    useFetchLocations([dog.zip_code]);

  return (
    <>
      <div className="relative rounded-xl mb-3 aspect-square w-full">
        <img
          src={dog.img}
          alt={dog.name}
          onLoad={() => setImageLoaded(true)}
          className={`rounded-xl aspect-square object-cover w-full transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="flex flex-col gap-[2px] ">
        <p className="text-2xl font-bold">{dog.name}</p>
        <p className="text-lg truncate">{dog.breed}</p>
        <p className="flex gap-1 text-neutral-500 items-center">
          <Cake size={20} />
          <span>
            {dog.age < 1
              ? "less than 1 year old"
              : `${dog.age} year${dog.age === 1 ? "" : "s"} old`}
          </span>
        </p>
        <p className="flex gap-1 text-neutral-500 items-center">
          <MapPin size={20} />
          {isLocationLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <span className="truncate">
              {locationData?.[0]?.city}, {locationData?.[0]?.state}{" "}
              {locationData?.[0]?.zip_code}
            </span>
          )}
        </p>
      </div>
    </>
  );
}
