import { Button } from "@/components/ui/button";

interface EmptyFavoritesProps {
  onBrowseAll: () => void;
}

export function EmptyFavorites({ onBrowseAll }: EmptyFavoritesProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">💔</div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Favorites Yet
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Start browsing dogs and click the heart icon to add them to your
        favorites!
      </p>
      <Button onClick={onBrowseAll} className="bg-blue-600 hover:bg-blue-700">
        Browse All Dogs
      </Button>
    </div>
  );
}
