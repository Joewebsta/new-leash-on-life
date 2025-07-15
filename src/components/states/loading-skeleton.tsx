import { DogGridSkeleton } from "@/components/skeletons/dog-grid-skeleton";
import { HeaderSkeleton } from "@/components/skeletons/header-skeleton";

export function LoadingSkeleton() {
  return (
    <div className="pb-[130px] px-6 md:px-10 xl:px-20">
      <HeaderSkeleton />
      <DogGridSkeleton />
    </div>
  );
}
