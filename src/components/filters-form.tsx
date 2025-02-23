import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useSearchDogs } from "@/services/dogService";
import { useSearchParams } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const FormSchema = z.object({
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
  const [resultsTotal, setResultsTotal] = React.useState(10_000);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = React.useMemo(
    () => ({
      sort: searchParams.get("sort") as z.infer<typeof FormSchema>["sort"],
      breeds: searchParams
        .getAll("breeds")
        .map((breed) => ({ value: breed, label: breed })),
      ageRange: [
        Number(searchParams.get("ageMin")) || 0,
        Number(searchParams.get("ageMax")) || 14,
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

  const searchParamsString = buildSearchParams(formValues).toString();

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
      sort: "breed:asc",
      breeds: [],
      ageRange: [0, 14],
      zipCodes: [],
    });
    setSearchParams(new URLSearchParams("?sort=breed:asc"));
  };

  const renderPrimaryButtonText = (resultsTotal: number) => {
    if (resultsTotal === 0) return "No dogs found";
    if (resultsTotal > 1000) return "Show 1000+ dogs";
    return `Show ${resultsTotal.toLocaleString()} dog${
      resultsTotal === 1 ? "" : "s"
    }`;
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
          <FormField
            control={form.control}
            name="sort"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Sort By</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                    className="flex flex-col space-y-1"
                    tabIndex={0}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="breed:asc" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Breed: A - Z
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="breed:desc" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Breed: Z - A
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="name:asc" />
                      </FormControl>
                      <FormLabel className="font-normal">Name: A - Z</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="name:desc" />
                      </FormControl>
                      <FormLabel className="font-normal">Name: Z - A</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="age:asc" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Age: Low - High
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="age:desc" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Age: High - Low
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breeds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breeds</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={breedOptions}
                    placeholder="Select one or more breeds"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ageRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Range</FormLabel>
                <FormControl>
                  <div className="h-6">
                    <DualRangeSlider
                      labelPosition="bottom"
                      label={(value) => <span>{value}</span>}
                      value={field.value}
                      onValueChange={field.onChange}
                      min={0}
                      max={14}
                      step={1}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCodes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zipcodes</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={[]}
                    creatable
                    placeholder="Select one or more zip codes"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="fixed flex gap-2 bottom-0 inset-x-0 p-4 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Button
              className="w-1/2"
              variant="secondary"
              type="button"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="w-1/2"
              type="submit"
              disabled={resultsTotal === 0}
            >
              {isLoadingSearchData ? (
                <PulseLoader
                  color="white"
                  loading={isLoadingSearchData}
                  size={8}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                renderPrimaryButtonText(resultsTotal)
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
