import { useState, useEffect, useMemo } from "react";
import { useSearchDogs } from "@/services/dogService";
import { buildSearchParams } from "@/lib/utils";
import { FiltersFormData } from "@/schemas/filters";
import { FILTERS_FORM_CONSTANTS } from "@/constants/constants";

export function useFiltersSearch(formValues: FiltersFormData) {
  const [resultsTotal, setResultsTotal] = useState<number>(
    FILTERS_FORM_CONSTANTS.DEFAULT_RESULTS_TOTAL
  );

  const searchParamsString = useMemo(
    () => buildSearchParams(formValues).toString(),
    [formValues]
  );

  const searchQuery = useSearchDogs(searchParamsString);

  useEffect(() => {
    if (searchQuery.data?.total !== undefined) {
      setResultsTotal(searchQuery.data.total);
    }
  }, [searchQuery.data?.total]);

  return {
    resultsTotal,
    isLoading: searchQuery.isPending,
    isError: searchQuery.isError,
  };
}
