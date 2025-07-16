import { Option } from "@/components/ui/multiple-selector";
import { FILTERS_FORM_CONSTANTS } from "@/constants/constants";
import { buildSearchParams, cn, getDefaultFormValues } from "@/lib/utils";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { FiltersFormData, FiltersFormSchema } from "@/schemas/filters";
import { useSearchDogs } from "@/services/dogService";
import { useSearchParams } from "react-router";
import {
  AgeRangeField,
  BreedsField,
  FormActions,
  SortByField,
  ZipCodesField,
} from "./fields";

interface FiltersFormProps extends React.ComponentProps<"form"> {
  breedOptions: Option[];
  onClose: () => void;
}

export function FiltersForm({
  className,
  breedOptions,
  onClose,
}: FiltersFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultsTotal, setResultsTotal] = React.useState<number>(
    FILTERS_FORM_CONSTANTS.DEFAULT_RESULTS_TOTAL
  );

  const form = useForm<FiltersFormData>({
    resolver: zodResolver(FiltersFormSchema),
    defaultValues: getDefaultFormValues(searchParams),
  });

  const formValues = form.watch();

  const searchParamsString = React.useMemo(
    () => buildSearchParams(formValues).toString(),
    [formValues]
  );

  const {
    isPending: isLoadingSearchData,
    isError: isSearchError,
    data: searchData,
  } = useSearchDogs(searchParamsString);

  React.useEffect(() => {
    if (searchData?.total !== undefined) {
      setResultsTotal(searchData.total);
    }
  }, [searchData?.total]);

  function onSubmit(data: FiltersFormData) {
    const params = buildSearchParams(data);
    setSearchParams(params);
    onClose();
  }

  const handleReset = () => {
    const { DEFAULT_SORT, DEFAULT_AGE_MIN, DEFAULT_AGE_MAX } =
      FILTERS_FORM_CONSTANTS;

    form.reset({
      sort: DEFAULT_SORT,
      breeds: [],
      ageRange: [DEFAULT_AGE_MIN, DEFAULT_AGE_MAX],
      zipCodes: [],
    });
    setSearchParams(new URLSearchParams(`?sort=${DEFAULT_SORT}`));
  };

  return (
    <div className={cn("pb-[98px] px-4 md:px-0", className)}>
      {isSearchError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">
            There was an error loading the search results. Please try again.
          </p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <SortByField control={form.control} />
          <BreedsField control={form.control} breedOptions={breedOptions} />
          <AgeRangeField control={form.control} />
          <ZipCodesField control={form.control} />
          <FormActions
            onReset={handleReset}
            isLoading={isLoadingSearchData}
            resultsTotal={resultsTotal}
          />
        </form>
      </Form>
    </div>
  );
}
