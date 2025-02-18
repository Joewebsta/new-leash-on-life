import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import { useNavigate, useSearchParams } from "react-router";
import { searchDogs } from "@/api/dogs";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const FormSchema = z.object({
  breeds: z.array(optionSchema),
});

interface FiltersFormProps extends React.ComponentProps<"form"> {
  breedOptions: Option[];
}

export function FiltersForm({ className, breedOptions }: FiltersFormProps) {
  const [, setSearchParams] = useSearchParams();
  // const [totalDogs, setTotalDogs] = React.useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
    console.log("DATA: ", data.breeds);

    // Convert the selected breeds into a URL-friendly format
    const breedParams = data.breeds.map((breed) => breed.value);
    console.log("BREED PARAMS: ", breedParams);

    // Update the URL parameters without navigation
    setSearchParams((prev) => {
      // Clear any existing breed parameters
      prev.delete("breeds");
      // Add each breed as a separate 'breeds' parameter
      breedParams.forEach((breed) => prev.append("breeds", breed));
      return prev;
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="breeds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frameworks</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={breedOptions}
                    placeholder="Select one or multiple breeds"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button className="w-full" type="submit" disabled={isPending}> */}
          <Button className="w-full" type="submit">
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
        </form>
      </Form>
    </div>
  );
}

{
  /* <form className={cn("grid items-start gap-4", className)}>
      <MultipleSelector
        defaultOptions={breedOptions}
        placeholder="Select breeds..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
      <div className="grid gap-2">
        <Label htmlFor="breeds">breeds</Label>
        <Input type="breeds" id="breeds" />
      </div>
      <Button type="submit">Apply</Button>
    </form> */
}
