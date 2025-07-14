import { Option } from "@/components/ui/multiple-selector";
import { cn } from "@/lib/utils";

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

const CONSTANTS = {
  DEFAULT_RESULTS_TOTAL: 10_000,
  DEFAULT_AGE_MIN: 0,
  DEFAULT_AGE_MAX: 14,
  DEFAULT_SORT: "breed:asc" as const,
  SEARCH_DEBOUNCE_MS: 300,
} as const;

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
  const [resultsTotal, setResultsTotal] = React.useState<number>(
    CONSTANTS.DEFAULT_RESULTS_TOTAL
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = React.useMemo(
    () => ({
      sort: searchParams.get("sort") as z.infer<typeof FormSchema>["sort"],
      breeds: searchParams
        .getAll("breeds")
        .map((breed) => ({ value: breed, label: breed })),
      ageRange: [
        Number(searchParams.get("ageMin")) || CONSTANTS.DEFAULT_AGE_MIN,
        Number(searchParams.get("ageMax")) || CONSTANTS.DEFAULT_AGE_MAX,
      ],
      zipCodes: searchParams
        .getAll("zipCodes")
        .map((zipCode) => ({ value: zipCode, label: zipCode })),
    }),
    [searchParams]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const formValues = form.watch();

  const buildSearchParams = (data: z.infer<typeof FormSchema>) => {
    const params = new URLSearchParams();

    if (data.sort) params.append("sort", data.sort);
    data.breeds.forEach((breed) => params.append("breeds", breed.value));
    data.zipCodes.forEach((zipCode) =>
      params.append("zipCodes", zipCode.value)
    );
    params.append("ageMin", data.ageRange[0].toString());
    params.append("ageMax", data.ageRange[1].toString());
    return params;
  };

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = buildSearchParams(data);
    setSearchParams(params);
    onClose();
  }

  const handleReset = () => {
    form.reset({
      sort: CONSTANTS.DEFAULT_SORT,
      breeds: [],
      ageRange: [CONSTANTS.DEFAULT_AGE_MIN, CONSTANTS.DEFAULT_AGE_MAX],
      zipCodes: [],
    });
    setSearchParams(new URLSearchParams("?sort=breed:asc"));
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
