import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

import { useSearchParams } from "react-router";
// import { searchDogs } from "@/api/dogs";

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
}

export function FiltersForm({ className, breedOptions }: FiltersFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = React.useMemo(
    () => ({
      sort: searchParams.get("sort") as z.infer<typeof FormSchema>["sort"],
      breeds: searchParams
        .getAll("breeds")
        .map((breed) => ({ value: breed, label: breed })),
      ageRange: [
        Number(searchParams.get("ageMin")) || 0,
        Number(searchParams.get("ageMax")) || 30,
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

  // const breeds = form.watch("breeds");

  // React.useEffect(() => {
  //   async function calcTotalDogs() {
  //     // console.log("searchParams: ", searchParams.toString());

  //     // console.log("Breeds selection changed:", breeds);

  //     const newSearchParams = new URLSearchParams(searchParams.toString());

  //     breeds.forEach((breed) => newSearchParams.append("breeds", breed.value));
  //     // breeds=Affenpinscher&breeds=African+Hunting+Dog&breeds=Airedale&breeds=Appenzeller&breeds=American+Staffordshire+Terrier

  //     const searchResults = await searchDogs(newSearchParams.toString());
  //     console.log("SEARCH RESULTS: ", searchResults);
  //     setTotalDogs(searchResults.total);
  //   }

  //   calcTotalDogs();
  // }, [breeds, searchParams]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams();

    if (data.sort) params.append("sort", data.sort);
    data.breeds.forEach((breed) => params.append("breeds", breed.value));
    data.zipCodes.forEach((zipCode) =>
      params.append("zipCodes", zipCode.value)
    );
    params.append("ageMin", data.ageRange[0].toString());
    params.append("ageMax", data.ageRange[1].toString());

    setSearchParams(params);
  }

  const handleReset = () => {
    form.reset({
      sort: "breed:asc",
      breeds: [],
      ageRange: [0, 30],
      zipCodes: [],
    });
    setSearchParams(new URLSearchParams("?sort=breed:asc"));
  };

  return (
    <div className={cn("pb-[98px] px-4", className)}>
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
                    placeholder="Select one or multiple breeds"
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
                      max={30}
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
                    placeholder="Select one or multiple zip codes"
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
            <Button className="w-1/2" type="submit">
              {/* {isPending ? (
              <PulseLoader
                color="white"
                loading={isPending}
                size={8}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Login"
            )} */}
              Apply
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
