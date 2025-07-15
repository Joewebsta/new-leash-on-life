import { Skeleton } from "@/components/ui/skeleton";

export function DogCardSkeleton() {
  return (
    <div className="relative">
      {/* Dog image skeleton */}
      <Skeleton className="rounded-xl mb-3 aspect-square w-full" />

      {/* Dog details skeleton */}
      <div className="flex flex-col gap-[2px]">
        {/* Dog name skeleton */}
        <Skeleton className="h-8 w-3/4 mb-1" />

        {/* Dog breed skeleton */}
        <Skeleton className="h-6 w-5/6 mb-1" />

        {/* Age row skeleton */}
        <div className="flex gap-1 items-center mb-1">
          <Skeleton className="w-5 h-5 rounded-sm" />
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Location row skeleton */}
        <div className="flex gap-1 items-center">
          <Skeleton className="w-5 h-5 rounded-sm" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </div>
  );
}
