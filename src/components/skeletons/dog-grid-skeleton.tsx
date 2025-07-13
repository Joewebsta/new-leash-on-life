import { DogCardSkeleton } from "@/components/skeletons/dog-card-skeleton";

interface DogGridSkeletonProps {
  count?: number;
}

export function DogGridSkeleton({ count = 25 }: DogGridSkeletonProps) {
  return (
    <div className="grid gap-y-11 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <DogCardSkeleton key={index} />
      ))}
    </div>
  );
}
