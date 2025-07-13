import { Skeleton } from "@/components/ui/skeleton";

export function MobileMatchButtonSkeleton() {
  return (
    <div className="fixed sm:hidden bottom-0 inset-x-0 p-6 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <Skeleton className="w-full h-9 rounded-md" />
    </div>
  );
}
