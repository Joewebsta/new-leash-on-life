import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <div className="py-6 gap-3 flex">
      {/* Filter button skeleton */}
      <Skeleton className="h-10 w-[99px] rounded-md" />

      {/* Match button skeleton */}
      <Skeleton className="h-10 w-52 rounded-md hidden sm:inline-flex" />
    </div>
  );
}
