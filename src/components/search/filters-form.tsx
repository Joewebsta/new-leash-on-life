import { Option } from "@/components/ui/multiple-selector";
import { FILTERS_FORM_CONSTANTS } from "@/constants/constants";
import { buildSearchParams, cn, getDefaultFormValues } from "@/lib/utils";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useSearchDogs } from "@/services/dogService";
import { useSearchParams } from "react-router";
import {
  SortByField,
  BreedsField,
  AgeRangeField,
  ZipCodesField,
  FormActions,
} from "./fields";
import {
  useSearchLocationsMutation,
  useSearchLocationsQuery,
} from "@/services/locationService";
import { useEffect } from "react";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const FormSchema = z.object({
  breeds: z.array(optionSchema),
  ageRange: z.array(z.number()).length(2),
  zipCodes: z.array(optionSchema),
  sort: z
    .enum([
      "name:asc",
      "name:desc",
      "breed:asc",
      "breed:desc",
      "age:asc",
      "age:desc",
    ])
    .nullable(),
});

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

  const {
    mutate: searchLocationsMutation,
    isPending: isLoadingSearchLocations,
  } = useSearchLocationsMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: getDefaultFormValues(searchParams),
  });

  const formValues = form.watch();
  console.log("formValues", formValues);

  const searchParamsString = React.useMemo(
    () => buildSearchParams(formValues).toString(),
    [formValues]
  );

  const { data: locationData } = useSearchLocationsQuery({
    city: "New York",
    states: ["NY"],
    size: 25,
  });

  const zipCodes = locationData?.results.map((location) => location.zip_code);
  const searchParams2 = new URLSearchParams(searchParamsString);
  searchParams2.delete("zipCodes");
  zipCodes?.forEach((zipCode) => searchParams2.append("zipCodes", zipCode));

  console.log("searchParams", searchParams2.toString());

  // STOPPED HERE
  // Zipcodes for preview and zipcodes for actual filter need to match.

  const {
    isPending: isLoadingSearchData,
    isError: isSearchError,
    data: searchData,
    // } = useSearchDogs(searchParamsString);
  } = useSearchDogs(searchParams2.toString());

  useEffect(() => {
    if (searchData?.total !== undefined) {
      setResultsTotal(searchData.total);
    }
  }, [searchData?.total]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    searchLocationsMutation(
      {
        city: "New York",
        states: ["NY"],
      },
      {
        onSuccess: (locationData) => {
          const zipCodes = locationData.results.map(
            (location) => location.zip_code
          );

          data.zipCodes = zipCodes;
          const params = buildSearchParams(data);
          setSearchParams(params);
          onClose();
        },
        onError: (error) => {
          // TODO: PROPER ERROR HANDLING
          console.error("error - location data", error);
        },
      }
    );
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
            isLoading={isLoadingSearchData || isLoadingSearchLocations}
            resultsTotal={resultsTotal}
          />
        </form>
      </Form>
    </div>
  );
}
