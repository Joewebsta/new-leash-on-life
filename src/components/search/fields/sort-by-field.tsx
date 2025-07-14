import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface SortByFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export function SortByField({ control }: SortByFieldProps) {
  return (
    <FormField
      control={control}
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
                <FormLabel className="font-normal">Breed: A - Z</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="breed:desc" />
                </FormControl>
                <FormLabel className="font-normal">Breed: Z - A</FormLabel>
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
                <FormLabel className="font-normal">Age: Low - High</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="age:desc" />
                </FormControl>
                <FormLabel className="font-normal">Age: High - Low</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
