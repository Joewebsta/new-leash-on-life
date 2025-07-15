import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <div className="py-6 gap-3 flex justify-between">
      {/* Tabs skeleton */}
      <Skeleton className="h-9 w-[185px] rounded-md" />

      {/* Filter button skeleton */}
      <Skeleton className="h-9 w-[99px] rounded-md" />
    </div>
  );
}
