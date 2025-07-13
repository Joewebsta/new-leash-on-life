import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchData } from "@/types/types";
import { useSearchParams } from "react-router";

interface SearchPaginationProps {
  searchData: SearchData;
}

export function SearchPagination({ searchData }: SearchPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNextResults = () => {
    if (searchData?.next) {
      setSearchParams(new URLSearchParams(searchData.next.split("?")[1]));
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handlePrevResults = () => {
    if (searchData?.prev) {
      setSearchParams(new URLSearchParams(searchData.prev.split("?")[1]));
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const currentPage = Math.floor(
    parseInt(searchParams.get("from") || "0") / 25 + 1
  );
  const totalPages = Math.ceil((searchData?.total || 0) / 25);

  return (
    <Pagination className="pb-6 mt-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePrevResults();
            }}
            className={
              !searchData?.prev ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        <PaginationItem>
          <span className="flex items-center px-4 py-2 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNextResults();
            }}
            className={
              !searchData?.next || currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
